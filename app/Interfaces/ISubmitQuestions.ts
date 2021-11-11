export default interface ISubmitQuestions {
  trialId: number
  studentId: number
  answers: {
    question_id: number
    choice_id: number
  }[]
}
