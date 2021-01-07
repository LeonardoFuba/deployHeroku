
import { Request, Response } from 'express';
import fetch, { Response as Body } from 'node-fetch';
import querystring from 'querystring';
import { URLSearchParams } from 'url';

import checkoutView from '../views/checkout_view';

export default {

  async create(request: Request, response: Response) {

    const body = new URLSearchParams(request.body)

    const params = querystring.stringify({
      email: process.env.CHECKOUT_EMAIL,
      token: process.env.CHECKOUT_TOKEN
    });

    const config = {
      method: "POST",
      body: body,
      headers: { "content-type": "application/x-www-form-urlencoded;charset=UTF-8", },
    }

    try {
      const xmlResponse = await fetch(`${process.env.PAGSEGURO_URL}/v2/checkout?${params}`, config ).then( async(res: Body) => {
        if (!res.ok) {
          throw new Error( await res.text() );
        }
        return res.text();
      });
      return response.status(200).json(checkoutView.render(xmlResponse));
    }
    catch (error) {
      console.log(error);
      return response.status(400).json({
        error: 'Unexpected error while request checkout.'
      });
    }
  }
}
