import DocumentRepository from 'App/Repositories/DocumentRepository'
import Document from 'App/Models/Document'
import TagRepository from 'App/Repositories/TagRepository'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'

export default class DocumentService {
  public static async createDocument(documentData: Partial<Document>): Promise<Document> {
    return await DocumentRepository.create(documentData)
  }

  public static async findDocumentByUUID(UUID: string): Promise<Document | null> {
    return await DocumentRepository.getDocumentByUUID(UUID)
  }

  public static async fetchDocuments({ pagination, orderBy, searchQuery, filters, dateRange, tags }) {
    if (typeof tags !== 'undefined' && tags.length > 0) return await DocumentRepository.getByTags(tags)
    return await DocumentRepository.getDocuments({
      pagination,
      orderBy,
      searchQuery,
      filters,
      dateRange,
    })
  }

  public static async update(documentData): Promise<Document> {
    return await DocumentRepository.update(documentData)
  }

  public static async deleteDocument(uuid: string): Promise<void> {
    const documentFound = await this.findDocumentByUUID(uuid)
    return await DocumentRepository.delete(documentFound)
  }

  public static async assignTag(data): Promise<any> {
    const tagRepository = new TagRepository()
    const document = await DocumentRepository.get('id', data.document_id)
    const tag = await tagRepository.get('id', data.tag_id)
    if (!document) {
      throw new ResourceNotFoundException('document Not found')
    }
    if (!tag) {
      throw new ResourceNotFoundException('Tag Not found')
    }
    const document_tag = await document?.related('tags').save(tag)
    return document_tag
  }
}
