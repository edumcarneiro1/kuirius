import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../bin/db/mongodb';

import { ObjectId } from 'mongodb';

type Data = {
  response?: any[];
  status: string
}

type Query = {
  _id?: any;
  name?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   try {

     if (req.method === 'GET') {
      let { id , name} = req.query;

      const query: Query = {};

      const _id = id && typeof id === 'string' ? id : '';

      
      if (_id !== '') query._id = new ObjectId(_id);
      if (name && name !== '') query.name = name;

      const client = await clientPromise;
      const db = client.db("kuiriusdb");
    
      const dishes = await db.collection("dishes").find(query).toArray();

      const formattedDishes = dishes.map((dish) => {
        return {_id: dish._id, name: capitalize(dish.name)} 
      });


      res.status(200).json({ status: 'success', response: formattedDishes });
    } else {
      res.status(404).json({ status: 'Not Found' });
    }
   } catch (e) {
     res.status(500).json({ status: "Can't connect to DB"});
   }
}

const capitalize = (name) => {
  const arr = name.split(" ");

  for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

  }

  return arr.join(" ");

}