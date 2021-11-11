import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
let questionId

test.group('Question', () => {
  test('ensure question is created successfully', async (assert) => {
    const response = await supertest(BASE_URL)
      .post('/Question/add')
      .send({
        score_weight: 50,
        content: 'What is frontend development?',
        type: 'open_question',
        choices: [
          {
            content: '12345',
            correct: true,
          },
        ],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    questionId = response.body.data.id
    assert.equal(response.body.data.score_weight, 50)
  })

  test('ensure question is not created due to validation error', async (assert) => {
    const response = await supertest(BASE_URL)
      .post('/Question/add')
      .send({
        content: 'What is frontend development?',
        type: 'open_question',
        choices: [
          {
            content: '12345',
            correct: true,
          },
        ],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
    assert.notEqual(response.body.score_weight, 50)
  })

  test('ensure questions are retrieved successfully', async (assert) => {
    const response = await supertest(BASE_URL).get('/Question/all').expect(200)
    assert.exists(response.body)
  })

  test('ensure question is retrieved successfully', async (assert) => {
    const response = await supertest(BASE_URL)
      .post('/Question')
      .send({ id: questionId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    assert.exists(response.body)
  })

  test('ensure question is not retrieved due to wrong id', async (assert) => {
    const response = await supertest(BASE_URL)
      .post('/Question')
      .send({ id: '123' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
    assert.exists(response.body)
  })

  test('ensure question is updated successfully', async (assert) => {
    const response = await supertest(BASE_URL)
      .patch('/Question')
      .send({ id: 1, content: 'what is devops?' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    assert.equal(response.body.data.content, 'what is devops?')
  })

  test('ensure question is not updated due to validation error', async (assert) => {
    const response = await supertest(BASE_URL)
      .patch('/Question')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
    assert.exists(response.body)
  })

  test('ensure question is not updated due to wrong id', async (assert) => {
    const response = await supertest(BASE_URL)
      .patch('/Question')
      .send({ id: 12 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
    assert.exists(response.body)
  })

  test('ensure question is deleted successfully', async (assert) => {
    const response = await supertest(BASE_URL)
      .delete('/Question')
      .send({ id: questionId })
      .set('Accept', 'application/json')
      .expect(200)
    assert.exists(response.body)
  })

  test('ensure question is not deleted due to wrong id', async (assert) => {
    const response = await supertest(BASE_URL)
      .delete('/Question')
      .send({ id: 1234 })
      .set('Accept', 'application/json')
      .expect(404)
    assert.exists(response.body)
  })
})
