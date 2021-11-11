import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class JwtUtility {
  public static async sign(payload): Promise<string> {
    return jwt.sign(payload, Env.get('APP_KEY'))
  }

  public static async verify(bearerToken: string): Promise<any> {
    const token = bearerToken.replace('Bearer ', '')
    return jwt.verify(token, Env.get('APP_KEY'))
  }

  public static async verify_(token: string) {
    try {
      await this.verify(token)
      return true
    } catch (e) {
      return false
    }
  }
}
