import { MongoClient } from "mongodb";

const ClientDb = async (name) => {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  return client.db(name);
};

export default ClientDb;
