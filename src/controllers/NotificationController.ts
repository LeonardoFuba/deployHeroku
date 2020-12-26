import { Request, Response } from 'express';


export default {

  async create(request: Request, response: Response) {
    console.log(request.body);

    return response.json(request.body);
  }


}
