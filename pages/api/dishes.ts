import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../bin/db/mongodb';

import { ObjectId } from 'mongodb';

type Data = {
  response?: any[];
  status: string
}

type Query = {
  _id?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   try {

     if (req.method === 'GET') {
      let { id } = req.query;

      const query: Query = {};

      const _id = id && typeof id === 'string' ? id : '';

      
      if (_id !== '') query._id = new ObjectId(_id);

      const client = await clientPromise;
      const db = client.db("kuiriusdb");
    
      const dishes = await db.collection("dishes").find(query).toArray();

      res.status(200).json({ status: 'success', response: dishes });
    } else {
      res.status(404).json({ status: 'Not Found' });
    }
   } catch (e) {
     res.status(500).json({ status: "Can't connect to DB"});
   }
}
