/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

//Test Apis
Route.group(() => {
  Route.post('Test/add', 'TestsController.create')
  Route.post('api/test/add-with-questions', 'TestsController.addFullTest')
  Route.post('Test', 'TestsController.getOneTest')
  Route.post('Test/all', 'TestsController.getAllTests')
  Route.patch('api/test', 'TestsController.updateTest')
  Route.delete('api/Test', 'TestsController.deleteTest')
  Route.post('Test/Question/add', 'TestsController.addQuestion')
  Route.post('api/test/add-tag', 'TestsController.addTag')
  Route.post('test/start', 'TestsController.startTrial')
  Route.post('test/submit-questions', 'TestsController.submitQuestions')

  //Question Apis
  Route.post('api/question/add', 'QuestionsController.create')
  Route.post('Question', 'QuestionsController.getOneQuestion')
  Route.get('Question/all', 'QuestionsController.getAllQuestions')
  Route.patch('api/question', 'QuestionsController.updateQuestion')
  Route.delete('api/question', 'QuestionsController.deleteQuestion')

  //Choice Apis
  Route.post('api/choice/add', 'ChoicesController.create')
  Route.post('Choice', 'ChoicesController.getOneChoice')
  Route.patch('api/choice', 'ChoicesController.updateChoice')
  Route.delete('api/choice', 'ChoicesController.deleteChoice')

  //Grade Apis
  Route.post('api/grade/add', 'GradesController.create')
  Route.delete('api/grade/update', 'GradesController.updateGrades')
}).middleware('jwtAuth')

//Tag Apis
Route.group(() => {
  Route.post('create', 'TagsController.create')
  Route.post('/get-one', 'TagsController.getOne')
  Route.post('fetch', 'TagsController.fetch')
  Route.put('/update', 'TagsController.update')
  Route.delete('/delete', 'TagsController.delete')
})
  .prefix('api/test/tag')
  .middleware('jwtAuth')


//Video Apis
Route.group(() => {
  Route.post('add', 'VideosController.create')
  Route.post('/', 'VideosController.getOneVideo')
  Route.post('fetch', 'VideosController.fetchVideos')
  Route.put('/', 'VideosController.updateVideo')
  Route.delete('', 'VideosController.deleteVideo')
  Route.post('/add-tag', 'VideosController.addTag')
})
  .prefix('api/video')
  .middleware('jwtAuth')

//View Apis
Route.group(() => {
  Route.post('create', 'ViewsController.create')
})
  .prefix('api/view')
  .middleware('jwtAuth')
//Document Apis
Route.group(() => {
  Route.post('add', 'DocumentsController.create')
  Route.post('/', 'DocumentsController.getOneDocument')
  Route.post('/fetch', 'DocumentsController.fetch')
  Route.put('/', 'DocumentsController.updateDocument')
  Route.delete('', 'DocumentsController.deleteDocument')
  Route.post('/add-tag', 'DocumentsController.addTag')
})
  .prefix('api/document')
