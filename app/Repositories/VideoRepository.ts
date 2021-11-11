import Video from 'App/Models/Video'
import IUpdateTest from 'App/Interfaces/IUpdateTest'
import Helpers from 'App/Helpers/Helpers'
import lucidFetchHelper from 'lucid-fetch-helper'

export default class VideoRepository {
  public static async create(videoData: Partial<Video>): Promise<Video> {
    return await Video.create(videoData)
  }

  public static async getVideos({ pagination, orderBy, searchQuery, filters, dateRange }) {
    return lucidFetchHelper({
      Model: Video,
      columnsSettings: { customColumnsSelectionList: [], method: 'exclude' },
      excludedSearchColumns: [],
      pagination, orderBy, searchQuery, filters, dateRange ,
    })
  }

  public static async getVideoByUUID(UUID: string): Promise<Video | null> {
    return await Video.findByOrFail('uuid', UUID)
  }

  public static async get(key: string, value: any) {
    return await Video.findBy(key, value)
  }

  public static async update(videoData: IUpdateTest): Promise<Video> {
    return Helpers.findByUUIDAndUpdate(Video, videoData, videoData.uuid)
  }

  public static async delete(video: Video | null): Promise<void> {
    return await video?.delete()
  }

  public static async getByTags(tags: string[]): Promise<any> {
    return Video.query().whereHas('tags', (query) => {
      query.whereIn('tag_id', tags)
    })
  }
}
