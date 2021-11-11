import Choice from 'App/Models/Choice'
import Trial from 'App/Models/Trial'
export default interface IValidateSubmitQuestions {
  currentScore: number
  passingScore: number
  choices: Partial<Choice>[]
  trial: Trial
}
