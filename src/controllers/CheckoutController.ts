
import { Request, Response } from 'express';
import fetch, { Headers, Response as Body } from 'node-fetch';
import querystring from 'querystring';

import xmlToJson from '../utils/xmlToJson';
import createXml from '../utils/createXml';

export default {

  async create(request: Request, response: Response) {

    const xmlBody = createXml(request.body);

    const params = querystring.stringify({
      email: process.env.CHECKOUT_EMAIL,
      token: process.env.CHECKOUT_TOKEN
    });

    let fetchStatus: number;

    await fetch(`https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?${params}`, {
      method: "POST",
      body: xmlBody,
      headers: new Headers({ "content-type": "application/xml; charset=ISO-8859-1", }),
    }).then( (res: Body) => {
      fetchStatus = Number(res.status);
      return res.text();
    }).then( (xml: string) => {
      if(fetchStatus === 200 ) {
        return response.status(fetchStatus).json(xmlToJson(xml));
      }
      else{
        console.log(xml);
        return response.status(fetchStatus).send(new Error("Unexpected error while fetch checkout."))
      }
    }).catch((error: string) => {
      console.log(error);
      return response.status(400).json({
        error: 'Unexpected error while request checkout.'
      })
    });
  }
}
