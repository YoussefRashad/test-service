import Choice from 'App/Models/Choice'
export default interface IValidateAnswers {
  currentScore: number
  passingScore: number
  choices: Partial<Choice>[]
}
