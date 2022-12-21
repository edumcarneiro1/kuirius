import type { NextApiRequest, NextApiResponse } from 'next'
import { ICity } from '../../bin/types';



type Data = {
  response?: ICity[];
  status: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
      const citiesMock: ICity[] = require("../../mock/cities.json");
      
      res.status(200).json({ status: 'success', response: citiesMock });
    } else {
      res.status(404).json({ status: 'Not Found' });
    }
}
