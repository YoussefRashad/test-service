// import Question from 'App/Models/Question'
// import test from 'japa'
// import supertest from 'supertest'

// const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
// let choiceId

// test.group('Choice', () => {
//   test('ensure choice is created successfully', async (assert) => {
//     const question = new Question()
//     question.score_weight = 50
//     question.content = 'What is frontend?'
//     question.type = 'open_question'
//     await question.save()

//     const response = await supertest(BASE_URL)
//       .post('/Choice/add')
//       .send({ question_id: question.id, content: '12345', correct: true })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200)
//     choiceId = response.body.data.id
//     assert.equal(response.body.data.correct, true)
//   })

//   test('ensure choice is not created due to validation', async (assert) => {
//     const response = await supertest(BASE_URL)
//       .post('/Choice/add')
//       .send({
//         content: '12345',
//         correct: true,
//       })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(422)
//     choiceId = response.body.id
//     assert.notEqual(response.body.correct, true)
//   })

//   test('ensure choice is retrieved successfully', async (assert) => {
//     const question = new Question()
//     question.score_weight = 50
//     question.content = 'What is frontend?'
//     question.type = 'open_question'
//     await question.save()

//     await supertest(BASE_URL)
//       .post('/Choice/add')
//       .send({ question_id: question.id, content: '12345', correct: true })
//       .set('Accept', 'application/json')

//     const response = await supertest(BASE_URL)
//       .post('/Choice')
//       .send({ id: question.id })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200)
//     assert.exists(response.body)
//   })

//   test('ensure choice is not retrieved due to wrong id', async (assert) => {
//     const response = await supertest(BASE_URL)
//       .post('/Question')
//       .send({ id: 1235 })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(404)
//     assert.exists(response.body)
//   })

//   test('ensure choice is updated successfully', async (assert) => {
//     const question = new Question()
//     question.score_weight = 50
//     question.content = 'What is frontend?'
//     question.type = 'open_question'
//     await question.save()

//     const createResponse = await supertest(BASE_URL)
//       .post('/Choice/add')
//       .send({ question_id: question.id, content: '12345', correct: true })
//       .set('Accept', 'application/json')

//     const response = await supertest(BASE_URL)
//       .patch('/Choice')
//       .send({ id: createResponse.body.data.id, correct: true })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200)
//     assert.equal(response.body.data.correct, true)
//   })

//   test('ensure choice is not updated due to validation error', async (assert) => {
//     const response = await supertest(BASE_URL)
//       .patch('/Choice')
//       .send({})
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(422)
//     assert.exists(response.body)
//   })

//   test('ensure choice is not updated due to wrong id', async (assert) => {
//     const response = await supertest(BASE_URL)
//       .patch('/Choice')
//       .send({ id: 1234 })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(404)
//     assert.exists(response.body)
//   })

//   test('ensure choice is deleted successfully', async (assert) => {
//     const question = new Question()
//     question.score_weight = 50
//     question.content = 'What is frontend?'
//     question.type = 'open_question'
//     await question.save()

//     const createResponse = await supertest(BASE_URL)
//       .post('/Choice/add')
//       .send({ question_id: question.id, content: '12345', correct: true })
//       .set('Accept', 'application/json')

//     const response = await supertest(BASE_URL)
//       .delete('/Choice')
//       .send({ id: createResponse })
//       .set('Accept', 'application/json')
//       .expect(422)
//     assert.exists(response.body)
//   })

//   test('ensure choice is not deleted due to wrong id', async (assert) => {
//     const response = await supertest(BASE_URL)
//       .delete('/Choice')
//       .send({ id: 1234 })
//       .set('Accept', 'application/json')
//       .expect(404)
//     assert.exists(response.body)
//   })
// })
