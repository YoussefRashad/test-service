import ViewRepository from 'App/Repositories/ViewRepository'
import View from 'App/Models/View'

export default class ViewService {
  public static async createView(viewData): Promise<View> {
    return await ViewRepository.create(viewData)
  }
}
