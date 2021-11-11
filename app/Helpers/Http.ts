import axios, { Method } from 'axios'
import Qs from 'qs'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { IResponseBody } from 'App/Interfaces/IResponseBody'
import { IResponseBodyException } from 'App/Interfaces/IResponseBodyException'

export default class Http {
  public static respond(
    responseObject: ResponseContract,
    data: object,
    message: string,
    statusCode: number = 200
  ) {
    const responseBody: IResponseBody = {
      data: data,
      message: message,
    }
    return responseObject.status(statusCode).send(responseBody)
  }

  static sendExceptionResponse(responseObject, ok, data, message, responseStatus = 200) {
    const responseBody: IResponseBodyException = {
      ok: ok,
      data: data,
      message: message,
    }
    return responseObject.status(responseStatus).send(responseBody)
  }

  public static get(url: string, params: Object = {}, headers: Object = {}) {
    return this.createAxiosPayload('get', url, params, headers)
  }

  public static post(url: string, body: Object, params: Object = {}, headers: Object = {}) {
    return this.createAxiosPayload('post', url, body, params, headers)
  }

  public static put(url: string, body: Object, params: Object = {}, headers: Object = {}) {
    return this.createAxiosPayload('put', url, body, params, headers)
  }

  public static delete(url: string, body: Object, params: Object = {}, headers: Object = {}) {
    return this.createAxiosPayload('delete', url, body, params, headers)
  }

  private static createAxiosPayload(
    method: Method,
    url: string,
    body: Object,
    params: Object = {},
    headers: Object = {}
  ) {
    return axios({
      url: url,
      method: method,
      headers: headers,
      data: body,
      params: params,
      paramsSerializer: function (params) {
        return Qs.stringify(params, { encode: false })
      },
    })
  }
}
