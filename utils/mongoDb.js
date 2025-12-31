
import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://admin:password123@localhost:27018/ecommerce?authSource=admin";
const DB_NAME = "ecommerce";
const COLLECTION_NAME = "products";

let mongoClient = null;
let mongoDb = null;

export async function initMongoDb() {
  try {
    mongoClient = new MongoClient(MONGO_URL);
    await mongoClient.connect();
    
    mongoDb = mongoClient.db(DB_NAME);
    const productsCollection = mongoDb.collection(COLLECTION_NAME);

    await productsCollection.createIndex({ name: 1 }, { unique: true });

    console.log("create name");
    return mongoDb;
  } catch (error) {
    console.error("error");
    throw error;
  }
}

export async function getDb() {
  if (!mongoDb) {
    await initMongoDb();
  }
  return mongoDb;
}