import test from 'japa'
import supertest from 'supertest'
import Question from 'App/Models/Question'
import Test from 'App/Models/Test'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
let testId

test.group('Test', () => {
  test('ensure test is created successfully', async (assert) => {
    const response = await supertest(BASE_URL)
      .post('/Test/add')
      .send({
        slug: 'one',
        title: 'test1000',
        type: 'midterm',
        duration: 1,
        duration_unit: 'h',
        active: false,
        overall_score: 50,
        passing_score: 30,
        grade: 'A',
        max_trials: 5,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    testId = response.body.data.uuid
    assert.equal(response.body.data.title, 'test1000')
  })

  test('ensure test is not created due to validation error', async (assert) => {
    const response = await supertest(BASE_URL)
      .post('/Test/add')
      .send({
        slug: 'one',
        type: 'midterm',
        duration: 1,
        duration_unit: 'h',
        active: false,
        overall_score: 50,
        passing_score: 30,
        grade: 'A',
        max_trials: 5,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
    assert.notEqual(response.body.type, 'midterm')
  })

  test('ensure tests are retrieved successfully', async (assert) => {
    const response = await supertest(BASE_URL).get('/Test/all').expect(200)
    assert.exists(response.body)
  })

  test('ensure test is retrieved successfully', async (assert) => {
    const response = await supertest(BASE_URL)
      .post('/Test')
      .send({ uuid: testId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    assert.exists(response.body)
  })

  test('ensure test is not retrieved due to wrong id', async (assert) => {
    const response = await supertest(BASE_URL)
      .post('/Test')
      .send({ uuid: '123' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
    assert.exists(response.body)
  })

  test('ensure test is updated successfully', async (assert) => {
    const response = await supertest(BASE_URL)
      .patch('/Test')
      .send({ uuid: testId, slug: 'ten' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    assert.exists(response.body)
    assert.equal(response.body.data.slug, 'ten')
  })

  test('ensure test is not updated due to validation error', async (assert) => {
    const response = await supertest(BASE_URL)
      .patch('/Test')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
    assert.exists(response.body)
  })

  test('ensure test is not updated due to wrong id', async (assert) => {
    const response = await supertest(BASE_URL)
      .patch('/Test')
      .send({ uuid: '12' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
    assert.exists(response.body)
  })

  test('ensure test is deleted successfully', async (assert) => {
    const response = await supertest(BASE_URL)
      .delete('/Test')
      .send({ uuid: testId })
      .set('Accept', 'application/json')
      .expect(200)
    assert.exists(response.body)
  })

  test('ensure test is not deleted due to wrong id', async (assert) => {
    const response = await supertest(BASE_URL)
      .delete('/Test')
      .send({ uuid: '1234' })
      .set('Accept', 'application/json')
      .expect(404)
    assert.exists(response.body)
  })

  test('ensure question is  added to test successfully', async (assert) => {
    const test = new Test()
    test.slug = 'one'
    test.type = 'midterm'
    test.duration = 1
    test.duration_unit = 'h'
    test.active = false
    test.overall_score = 50
    test.passing_score = 30
    test.grade = 'A'
    test.max_trials = 5
    await test.save()

    const question = new Question()
    question.score_weight = 50
    question.content = 'What is frontend?'
    question.type = 'open_question'
    await question.save()

    const response = await supertest(BASE_URL)
      .post('/Test/Question/add')
      .send({ test_id: test.uuid, question_id: question.id })
      .set('Accept', 'application/json')
      .expect(200)
    assert.exists(response.body)
  })
})
