import Tag from 'App/Models/Tag'

import lucidFetchHelper from 'lucid-fetch-helper'

export default class TagRepository {
  public async create(data) {
    return await Tag.create(data)
  }
  public async get(key: string, value: any) {
    return await Tag.findBy(key, value)
  }

  public async fetchTags({ pagination, orderBy, searchQuery, filters, dateRange }) {
    return lucidFetchHelper({
      Model: Tag,
      columnsSettings: { customColumnsSelectionList: [], method: 'exclude' },
      excludedSearchColumns: [],
      pagination,
      orderBy,
      searchQuery,
      filters,
      dateRange,
    })
  }
  public async update(tag: Tag, data) {
    return await tag.merge(data).save()
  }
  public async delete(tag: Tag) {
    return await tag.delete()
  }
}
