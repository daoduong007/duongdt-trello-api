import { MongoClient } from 'mongodb';
import { env } from '*/config/environment';

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI);
  try {
    //connect the client to server
    await client.connect();
    console.log('connected successfully to server');

    //list databases
    await listDatabases(client);
  } finally {
    // Ensures that the client will close when finished/error
    await client.close();
  }
};

const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases();
  console.log(databaseList);
  console.log('Your databases :');
  databaseList.databases.forEach((db) => {
    console.log(` -${db.name} `);
  });
};
