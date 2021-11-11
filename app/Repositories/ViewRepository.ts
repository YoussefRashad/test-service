import View from 'App/Models/View'

export default class ViewRepository {
  public static async create(viewData): Promise<View> {
    return await View.create(viewData)
  }

}
