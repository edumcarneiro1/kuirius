import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../bin/db/mongodb';

import { ObjectId } from 'mongodb';

type Data = {
  response?: any;
  status: string
}

type Query = {
    _id?: any;
    city?: any;
    dish?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   try {
    const client = await clientPromise;
    const db = client.db("kuiriusdb");

     if (req.method === 'GET') {
      let { city, dish } = req.query;

      const _city = city && typeof city === 'string' ? city : '';
      const _dish = dish && typeof dish === 'string' ? dish : '';


      const query: Query = {};

      if (_city !== '')  query.city =  _city
      if (_dish !== '')  query.dish =  _dish

      const restaurantDishes = await db.collection("restaurants_dishes").find(query).sort({score: -1}).collation({locale: "en_US", numericOrdering: true}).toArray();

      const restaurantDishesWithStatus = restaurantDishes.map((restaurant) => {
        return {
          ...restaurant,
          liked: false,
          disliked: false
        }
      })
      
      res.status(200).json({ status: 'success', response: restaurantDishesWithStatus });
    } else {
      const dish = JSON.parse(req.body);

      const query: Query = {};

      const _id = dish._id && typeof dish._id === 'string' ? dish._id : '';
      
      if (_id !== '') query._id = new ObjectId(_id);

      const options = { upsert: false};

      const updateDoc = {
        $set: {
          score: dish.score
        }, 
      };

      
      const result = await db.collection("restaurants_dishes").updateOne(query, updateDoc, options);
    
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );

      res.status(200).json({ status: 'Success', response: {_id: result.upsertedId} });
    }
   } catch (e) {
     res.status(500).json({ status: "Can't connect to DB"});
   }
}
