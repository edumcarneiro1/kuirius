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
      let { id, name } = req.query;

      const _id = id && typeof id === 'string' ? id : '';

      const query: Query = {};
      
      let cities: any = [];
      query.featured = true;
    
      if (_id !== '') query._id = new ObjectId(_id);
      if (name && name !== '') query.name = name;
     
      const client = await clientPromise;
      const db = client.db("kuiriusdb");

      const citiesFeatured = await db.collection("cities").find(query).sort('name').toArray();
      
      query.featured = false; 

      const citiesNotFeatured = await db.collection("cities").find(query).sort('name').toArray();

      cities = [...citiesFeatured, ...citiesNotFeatured];
      
      res.status(200).json({ status: 'success', response: cities });
    } else {
      res.status(404).json({ status: 'Not Found' });
    }
   } catch (e) {
     res.status(500).json({ status: "Can't connect to DB"});
   }
}
