import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';
import fetch, { Response as Body } from 'node-fetch';
import querystring from 'querystring';

import transactionView from '../views/transaction_view';


export default {

  async show(request: Request, response: Response, next: NextFunction) {
    const body = request.body;

    const bodySchema = Yup.object().shape({
      notificationCode: Yup.string().required().length(39),
      notificationType: Yup.string().required(),
    });

    await bodySchema.validate(body, {
      abortEarly: false,
    })

    const params = querystring.stringify({
      email: process.env.CHECKOUT_EMAIL,
      token: process.env.CHECKOUT_TOKEN
    });

    const config = {
      method: "GET",
    }


    try {
      const xmlResponse = await fetch(`${process.env.PAGSEGURO_URL}/v3/transactions/notifications/${body.notificationCode}?${params}`, config ).then( async(res: Body) => {
        if (!res.ok) {
          throw new Error( await res.text() );
        }
        return res.text();
      });
      response.locals = transactionView.render(xmlResponse);
    }
    catch (error) {
      console.log(error);
      return response.status(400).json({
        error: 'Unexpected error while request transaction data.'
      });
    }

    next();
  }
}
