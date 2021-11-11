import * as aws from 'aws-sdk'
import Env from '@ioc:Adonis/Core/Env'

export default class Mail {
  public static async sendEmail(email, subject, content) {
    aws.config.update({
      accessKeyId: Env.get('SES_ACCESS_KEY'),
      secretAccessKey: Env.get('SES_ACCESS_SECRET'),
      region: Env.get('SES_REGION'),
    })

    // Create sendEmail params
    const params = {
      Destination: { ToAddresses: [email] },
      Message: {
        Body: { Html: { Charset: 'UTF-8', Data: content } },
        Subject: { Charset: 'UTF-8', Data: subject },
      },
      Source: 'no-reply@eduact.me',
      ReplyToAddresses: ['no-reply@eduact.me'],
    }

    // Create the promise and SES service object
    const sendPromise = new aws.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise()

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then(function (data) {
        console.log('Mailer: ', data)
        return data
      })
      .catch(function (err) {
        console.log('Mailer: ', err)
        return err
      })
  }
}
