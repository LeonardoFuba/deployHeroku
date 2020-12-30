import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';
import fetch, { Response as Body } from 'node-fetch';
import querystring from 'querystring';

import xmlToJson from '../utils/xmlToJson';
import serializeNotificationFetchResponse from '../serializations/serializeNotificationFetchResponse';



export default {

  async show(request: Request, response: Response, next: NextFunction) {
    const body = request.body;

    const bodySchema = Yup.object().shape({
      notificationCode: Yup.string().required().length(39),
      notificationType: Yup.string().required(),
    });

    let fetchStatus = 0;

    try{
      await bodySchema.validate(body, {
        abortEarly: false,
      })

      const params = querystring.stringify({
        email: process.env.CHECKOUT_EMAIL,
        token: process.env.CHECKOUT_TOKEN
      });

      const fetchResponse = await fetch(`https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications/${body.notificationCode}?${params}`, {
        method: "GET",
      }).then( (res: Body) => {
        fetchStatus = Number(res.status);
        return res.text();
      }).then( (xml: string) => {
        return xmlToJson(xml);
      }).catch((error: string) => {
        console.log(error);
        return response.status(400).json({
          error: 'Unexpected error while request transaction data.'
        })
      });

      const transaction = serializeNotificationFetchResponse(fetchResponse);

      response.locals = {
        orderId: transaction.items.item.id,
        paymentStatus: transaction.status,
        paymentType: transaction.paymentMethod.type,
      }

      next();
    }
    catch (err) {
      console.log(err);

      return response.status(fetchStatus);
    }
  }
}
