import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../bin/db/mongodb';

import { ObjectId } from 'mongodb';

type Data = {
  response?: any;
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
      const client = await clientPromise;
      const db = client.db("kuiriusdb");

     if (req.method === 'GET') {
      let { id , name} = req.query;

      const query: Query = {};

      const _id = id && typeof id === 'string' ? id : '';

      
      if (_id !== '') query._id = new ObjectId(_id);
      if (name && name !== '') query.name = name;


    
      const dishes = await db.collection("dishes").find(query).toArray();

      const formattedDishes = dishes.map((dish) => {
        return {_id: dish._id, name: capitalize(dish.name)} 
      });


      res.status(200).json({ status: 'success', response: formattedDishes });
    } else {
      if (!req.body ) res.status(500).json({ status: "Body is required"});

      const dishObject = JSON.parse(req.body);

      if (!dishObject.name || dishObject.name === '') res.status(500).json({status: 'Valid name dish is required'});

      const restaurantDishResult = await db.collection("dishes").insertOne({
        name: dishObject.name.toLowerCase()
      })

      console.log(restaurantDishResult);

      res.status(200).json({ status: 'Success', response: {id: restaurantDishResult.insertedId}});
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