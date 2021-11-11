import { v4 as uuidv4 } from 'uuid'
import size from 'lodash/size'

export default class Helpers {
  public static generateUUID(): string {
    let uuid = uuidv4()
    uuid = uuid.replace(/-/g, '')
    return uuid
  }
  public static updateObject<T>(obj: T, updates: object): T {
    for (let updateKey in updates) {
      obj[updateKey] = updates[updateKey]
    }
    return obj
  }

  public static async findByUUIDAndUpdate(Model, updateData, uuid: string): Promise<typeof Model> {
    if (size(updateData) <= 0) return
    let entry = await Model.findByOrFail('uuid', uuid)
    entry = this.updateObject<typeof Model>(entry, updateData)
    return await entry.save()
  }
  public static async findByIdAndUpdate(Model, updateData, id: number): Promise<typeof Model> {
    if (size(updateData) <= 0) return
    let entry = await Model.findByOrFail('id', id)
    entry = this.updateObject<typeof Model>(entry, updateData)
    return await entry.save()
  }
}
