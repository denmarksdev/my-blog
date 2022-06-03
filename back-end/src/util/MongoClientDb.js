import { MongoClient } from "mongodb";

const ClientDb = async () => {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  return client;
};

export const withDB = async (operations, onError = () => {}) => {
  try {
    const client = await ClientDb();
    const db = client.db("my-blog");

    await operations(db);
    
    client.close();
  } catch (error) {
    console.error(error);
    onError();
  }
};

export default ClientDb;
