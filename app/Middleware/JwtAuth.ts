import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import JwtUtility from 'App/Helpers/JwtUtility'

/* BEARER word extraction */
// const user = {
//   id: 1,
//   uuid: '123456',
//   name: 'Abdelrahman',
//   type: 'student',
// }

const types = ['student', 'admin', 'instructor']
export default class JwtAuth {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const authHeader = request.headers().authorization
    if (typeof authHeader !== 'string')
      throw new UnauthorizedException('you must provide a token in Authorization header')
    try {
      const decode = await JwtUtility.verify(authHeader)
      if (!decode) throw new Error()
      if (!decode.id || !decode.uuid || !decode.type || !types.includes(decode.type))
        throw new Error()
      request.user = decode
    } catch (error) {
      throw new UnauthorizedException('Invalid Token')
    }
    await next()
  }
}
