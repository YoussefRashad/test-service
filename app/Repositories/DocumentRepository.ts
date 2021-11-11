import Document from 'App/Models/Document'
import IUpdateTest from 'App/Interfaces/IUpdateTest'
import Helpers from 'App/Helpers/Helpers'
import lucidFetchHelper from 'lucid-fetch-helper'

export default class DocumentRepository {
  public static async create(documentData: Partial<Document>): Promise<Document> {
    return await Document.create(documentData)
  }
  public static async get(key: string, value: any) {
    return await Document.findBy(key, value)
  }

  public static async getDocuments({ pagination, orderBy, searchQuery, filters, dateRange }) {
    return lucidFetchHelper({
      Model: Document,
      columnsSettings: { customColumnsSelectionList: [], method: 'exclude' },
      excludedSearchColumns: [],
      pagination, orderBy, searchQuery, filters, dateRange ,
    })
  }

  public static async getDocumentByUUID(UUID: string): Promise<Document | null> {
    return await Document.findByOrFail('uuid', UUID)
  }

  public static async update(documentData: IUpdateTest): Promise<Document> {
    return Helpers.findByUUIDAndUpdate(Document, documentData, documentData.uuid)
  }

  public static async delete(document: Document | null): Promise<void> {
    return await document?.delete()
  }

  public static async getByTags(tags: string[]): Promise<any> {
    return Document.query().whereHas('tags', (query) => {
      query.whereIn('tag_id', tags)
    })
  }
}
