// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDish } from '../../bin/types';


type Data = {
  response?: IDish[];
  status: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
      const dishesMock: IDish[] = require("../../mock/dishes.json");
      res.status(200).json({ status: 'success', response: dishesMock });
    } else {
      res.status(404).json({ status: 'Not Found' });
    }
}
