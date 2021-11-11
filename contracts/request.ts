import IAuthPayload from 'App/Interfaces/IAuthPayload'
declare module '@ioc:Adonis/Core/Request' {
  interface RequestContract {
    user: IAuthPayload
  }
}
