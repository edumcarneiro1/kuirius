import type { NextApiRequest, NextApiResponse } from 'next'
import { ICity } from '../../types/types';
import clientPromise from '../../bin/db/mongodb';
import { ObjectId } from 'mongodb'

type Data = {
  response?: any[];
  status: string
}

type Query = {
  featured?: boolean;
  _id?: any;
  name?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   try {

     if (req.method === 'GET') {
      let { featured, id, name } = req.query;

      const featuredParam = featured && (featured === 'true' || featured === 'false') ? featured === "true" : null;
      const _id = id && typeof id === 'string' ? id : '';


      const query: Query = {};
      if (featuredParam === true || featuredParam === false) query.featured = featuredParam;
    
      if (_id !== '') query._id = new ObjectId(_id);
      if (name && name !== '') query.name = name;
     
      const client = await clientPromise;
      const db = client.db("kuiriusdb");
      const cities = await db.collection("cities").find(query).toArray();
      
      res.status(200).json({ status: 'success', response: cities });
    } else {
      res.status(404).json({ status: 'Not Found' });
    }
   } catch (e) {
     res.status(500).json({ status: "Can't connect to DB"});
   }
}
