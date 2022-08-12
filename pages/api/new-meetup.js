import { MongoClient } from "mongodb";


const handler = async (req, res) => {


  if (req.method === 'POST') {

    const connectString = process.env.REACT_APP_MONGO_CONNECTION_STRING;

    const data = req.body;

    const client = await MongoClient.connect(connectString);
  
    const db = client.db();
  
    const meetupCollection = db.collection('meetups');
  
    const result = await meetupCollection.insertOne(data);

    res.status(201).json({message: 'Meetup Inserted'});

    client.close();
  }
}

export default handler;