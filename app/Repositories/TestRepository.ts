import Test from 'App/Models/Test'
import IUpdateTest from 'App/Interfaces/IUpdateTest'
import Helpers from 'App/Helpers/Helpers'
import lucidFetchHelper from 'lucid-fetch-helper'

export default class TestRepository {
  public static async create(testData: Partial<Test>): Promise<Test> {
    return await Test.create(testData)
  }

  public static async getAll({ pagination, orderBy, searchQuery, filters, dateRange }) {
    return lucidFetchHelper({
      Model: Test,
      columnsSettings: { customColumnsSelectionList: [], method: 'exclude' },
      excludedSearchColumns: [],
      pagination,
      orderBy,
      searchQuery,
      filters,
      dateRange,
    })
  }

  public static async getTestByUUID(UUID: string): Promise<Test | null> {
    return await Test.findBy('uuid', UUID)
  }

  public static async getByTags(tags: string[]): Promise<any> {
    return Test.query().whereHas('tags', (query) => {
      query.whereIn('tag_id', tags)
    })
  }

  public static async getTestByID(ID: number): Promise<Test | null> {
    return await Test.findBy('id', ID)
  }

  public static async getTestQuestions(id: number): Promise<any> {
    //const test = await Test.find(id)
    // return await test?.related('questions').query().pojo()
    return Test.query().where('id', id).preload('questions').withCount('questions').first()
  }

  public static async update(testData: IUpdateTest): Promise<Test> {
    return Helpers.findByUUIDAndUpdate(Test, testData, testData.uuid)
  }

  public static async delete(test: Test | null): Promise<void> {
    await test?.related('questions').detach()
    return await test?.delete()
  }
}
