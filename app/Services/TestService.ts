import TestRepository from 'App/Repositories/TestRepository'
import QuestionRepository from 'App/Repositories/QuestionRepository'
import TrialRepository from 'App/Repositories/TrialRepository'
import GradeRepository from 'App/Repositories/GradeRepository'
import AnswerRepository from 'App/Repositories/AnswerRepository'
import TagRepository from 'App/Repositories/TagRepository'
import Test from 'App/Models/Test'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import BadRequestException from 'App/Exceptions/BadRequestException'
import ISubmitQuestions from 'App/Interfaces/ISubmitQuestions'
import IStartTrial from 'App/Interfaces/IStartTrial'
import Trial from 'App/Models/Trial'
import Choice from 'App/Models/Choice'
import Answer from 'App/Models/Answer'
import IValidateAnswers from 'App/Interfaces/IValidateAnswers'
import IValidateSubmitQuestions from 'App/Interfaces/IValidateSubmitQuestions'
import Messages from 'App/Constants/Messages'

export default class TestService {
  public static async createTest(testData: Partial<Test>): Promise<Test> {
    return await TestRepository.create(testData)
  }

  public static async findTestByUUID(UUID: string): Promise<Test> {
    const test = await TestRepository.getTestByUUID(UUID)
    if (!test) throw new ResourceNotFoundException('test Not found')
    return test
  }

  public static async findTestByID(ID: number): Promise<Test> {
    const test = await TestRepository.getTestByID(ID)
    if (!test) throw new ResourceNotFoundException('test Not found')
    return test
  }

  public static async findTestQuestions(id: number): Promise<any> {
    const test = await TestRepository.getTestQuestions(id)
    if (!test) throw new ResourceNotFoundException('test Not found')
    return test
  }

  public static async findAllTests({ pagination, orderBy, searchQuery, filters, dateRange, tags }) {
    if (typeof tags !== 'undefined' && tags.length > 0) return await TestRepository.getByTags(tags)
    return await TestRepository.getAll({
      pagination,
      orderBy,
      searchQuery,
      filters,
      dateRange,
    })
  }

  public static async update(testData): Promise<Test> {
    return await TestRepository.update(testData)
  }

  public static async deleteTest(uuid: string): Promise<void> {
    const testFound = await this.findTestByUUID(uuid)
    return await TestRepository.delete(testFound)
  }

  public static async assignQuestion(data): Promise<any> {
    const test = await this.findTestByUUID(data.test_id)
    const question = await QuestionRepository.getQuestionByUUID(data.question_id)
    if (!question) {
      throw new ResourceNotFoundException('Question Not found')
    }
    const test_question = await test?.related('questions').save(question)
    return test_question
  }

  public static async assignTag(data): Promise<any> {
    const tagRepository = new TagRepository()
    const test = await this.findTestByUUID(data.test_id)
    const tag = await tagRepository.get('id', data.tag_id)
    if (!tag) {
      throw new ResourceNotFoundException('Tag Not found')
    }
    const test_tag = await test?.related('tags').save(tag)
    return test_tag
  }

  public static async startTrial({ testUUID, studentId }: IStartTrial): Promise<void> {
    const test = await this.validateStartTrial({ testUUID, studentId })
    await TrialRepository.updateMany(test?.id, studentId, { score: 0, status: 'failed' })
    await TrialRepository.create({ test_id: test.id, student_id: studentId, status: 'starting' })

    return
  }

  public static async submitQuestions(data: ISubmitQuestions): Promise<void> {
    const { currentScore, passingScore, choices, trial } = await this.validateSubmitQuestions(data)
    await this.createAnswers(choices, trial.id)
    await this.updateTrial(currentScore, trial, passingScore)

    return
  }

  private static async validateStartTrial({ testUUID, studentId }: IStartTrial): Promise<Test> {
    const test = await this.findTestByUUID(testUUID)
    if (!test) throw new ResourceNotFoundException(Messages.error.TestNotExist)
    if (!test.active) throw new BadRequestException(Messages.error.TestNotActive)
    const trials = await TrialRepository.getTrials(test?.id, studentId)
    if (trials.length >= test.max_trials)
      throw new BadRequestException(Messages.error.TrialMaximumNumber)

    return test
  }

  private static async validateSubmitQuestions({
    trialId,
    answers,
  }: ISubmitQuestions): Promise<IValidateSubmitQuestions> {
    const trial = await this.validateTrial(trialId)
    const result = await this.validateAnswers(answers, trial)

    return { ...result, trial }
  }

  private static async validateTrial(trialID: number): Promise<Trial> {
    const trial = await TrialRepository.getLastTrial()
    if (trial?.id !== trialID) throw new BadRequestException(Messages.error.oldTrial)
    if (trial.score) throw new BadRequestException(Messages.error.trialEnd)

    return trial
  }

  private static async validateAnswers(answers, trial: Trial): Promise<IValidateAnswers> {
    let score = 0
    let choicesArray: Partial<Choice>[] = []
    //Validate Questions Number
    const {
      $preloaded: { questions },
      $extras: { questions_count },
      passing_score,
    } = await this.findTestQuestions(trial.test_id)
    if (answers.length !== parseInt(questions_count))
      throw new BadRequestException(Messages.error.QuestionsNumber)

    for (const answer of answers) {
      //Validate Question
      const question = questions.find((question) => answer.question_id === question.id)
      if (!question) throw new BadRequestException(Messages.error.QuestionWrong)
      //Validate Choice
      const choices = await QuestionRepository.getQuestionChoices(answer.question_id)
      const choice = choices.find((choice) => choice.id === answer.choice_id)
      if (!choice) {
        throw new BadRequestException(Messages.error.ChoiceWrong)
      }
      //Calculate Score
      if (choice.correct) score += question.score_weight

      choicesArray.push(choice)
    }

    return { currentScore: score, passingScore: passing_score, choices: choicesArray }
  }

  private static async createAnswers(choices: Partial<Choice>[], trialID: number): Promise<void> {
    let answersArray: Partial<Answer>[] = []
    for (const { id, question_id, correct, content } of choices) {
      answersArray.push({ trial_id: trialID, question_id, choice_id: id, correct, content })
    }
    await AnswerRepository.createMany(answersArray)

    return
  }

  private static async updateTrial(score: number, trial: Trial, passing_score): Promise<void> {
    const status = score >= passing_score ? 'passed' : 'failed'
    const grade = await GradeRepository.getGrade(score)
    await TrialRepository.update(trial, { score, status, grade_id: grade?.id })

    return
  }
}
