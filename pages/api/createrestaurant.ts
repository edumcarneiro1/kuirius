import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../bin/db/mongodb';

import { ObjectId } from 'mongodb';

type Data = {
  response?: any[];
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
    const client = await clientPromise;
    const db = client.db("kuiriusdb");
    
    if (!req.body ) res.status(500).json({ status: "Body is required"});
    
    const restaurantDish = JSON.parse(req.body);
    
    if (!restaurantDish.name || req.body.name === '') res.status(500).json({ status: "Valid Restaurant name is required"});
    if (!restaurantDish.city || req.body.city === '') res.status(500).json({ status: "Valid City ID is required"});
    if (!restaurantDish.score || req.body.score === '' || req.body.score === '0') res.status(500).json({ status: "Valid Restaurant score is required"});
    if (!restaurantDish.dish || req.body.dish === '') res.status(500).json({ status: "Valid Restaurant dish Id is required"});
    if (!restaurantDish.dateOfCreation || req.body.dateOfCreation === '') res.status(500).json({ status: "Valid Restaurant date of Creation is required"});
  
    const restaurantDishResult = await db.collection("restaurants_dishes").insertOne(restaurantDish);

    res.status(200).json({ status: 'Success' });

}
