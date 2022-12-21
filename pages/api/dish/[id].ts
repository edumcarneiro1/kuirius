import type { NextApiRequest, NextApiResponse } from 'next'
import { IDish } from '../../../bin/types';



type Data = {
  response?: IDish;
  status: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        const { id } = req.query;

        const dishes: IDish[] = require("../../../mock/dishes.json");
        const dish = dishes.find(elem => elem.id ===  Number(id));

        res.status(200).json({ status: 'success', response: dish });
    } else {
      res.status(404).json({ status: 'Not Found' });
    }
}
