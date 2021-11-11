import VideoRepository from 'App/Repositories/VideoRepository'
import Video from 'App/Models/Video'
import TagRepository from 'App/Repositories/TagRepository'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'

export default class VideoService {
  public static async createVideo(videoData: Partial<Video>): Promise<Video> {
    return await VideoRepository.create(videoData)
  }

  public static async findVideoByUUID(UUID: string): Promise<Video | null> {
    return await VideoRepository.getVideoByUUID(UUID)
  }

  public static async fetchVideos({ pagination, orderBy, searchQuery, filters, dateRange, tags }) {
    if (typeof tags !== 'undefined' && tags.length > 0) return await VideoRepository.getByTags(tags)
    return await VideoRepository.getVideos({
      pagination,
      orderBy,
      searchQuery,
      filters,
      dateRange,
    })
  }

  public static async update(videoData): Promise<Video> {
    return await VideoRepository.update(videoData)
  }

  public static async deleteVideo(uuid: string): Promise<void> {
    const videoFound = await this.findVideoByUUID(uuid)
    return await VideoRepository.delete(videoFound)
  }

  public static async assignTag(data): Promise<any> {
    const tagRepository = new TagRepository()
    const video = await VideoRepository.get('id', data.video_id)
    const tag = await tagRepository.get('id', data.tag_id)
    if(!video){
      throw new ResourceNotFoundException('Video Not found')
    }
    if (!tag) {
      throw new ResourceNotFoundException('Tag Not found')
    }
    const video_tag = await video?.related('tags').save(tag)
    return video_tag
  }
}
