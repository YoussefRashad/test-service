import Tag from 'App/Models/Tag'
import TagRepository from 'App/Repositories/TagRepository'
import TestService from 'App/Services/TestService'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import Messages from 'App/Constants/Messages'

export default class TagService {
  private _tagRepository = new TagRepository()

  public async createOrFail(key, data): Promise<Tag> {
    const isExist = await this.getTag(key, data.name)
    if (isExist) {
      throw new ResourceNotFoundException(Messages.error.TagIsExist)
    }
    return await this._tagRepository.create(data)
  }

  public static async createAndAssign(testID: number, tagData: Partial<Tag>): Promise<Tag> {
    const test = await TestService.findTestByID(testID)
    return await test.related('tags').create(tagData)
  }

  public static async createMultiply(test_id, instructor_id, tags): Promise<Tag[]> {
    return await Promise.all(
      tags.map(async (tag) => {
        await this.createAndAssign(test_id, { instructor_id, ...tag })
      })
    )
  }

  public async getTag(key: string, value): Promise<Tag | null> {
    return await this._tagRepository.get(key, value)
  }
  public async getTagOrFail(key: string, value): Promise<Tag> {
    const tag = await this.getTag(key, value)
    if (!tag) {
      throw new ResourceNotFoundException(Messages.error.TagNotExist)
    }
    return tag
  }

  public async fetchTags({ pagination, orderBy, searchQuery, filters, dateRange }) {
    return await this._tagRepository.fetchTags({
      pagination,
      orderBy,
      searchQuery,
      filters,
      dateRange,
    })
  }

  public async updateOrFail(key: string, value, data) {
    const tag = await this.getTag(key, value)
    if (!tag) {
      throw new ResourceNotFoundException(Messages.error.TagNotExist)
    }
    const { id, ...tagWithoutId } = data
    return await this._tagRepository.update(tag, tagWithoutId)
  }

  public async deleteOrFail(key: string, value) {
    const tag = await this.getTag(key, value)
    if (!tag) {
      throw new ResourceNotFoundException(Messages.error.TagNotExist)
    }
    await this._tagRepository.delete(tag)
    return
  }
}
