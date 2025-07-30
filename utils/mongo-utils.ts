import { MongoClient, Db } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI!
const dbName = process.env.MONGO_DB!
if (!uri) {
    throw new Error('MONGO_URI is not defined in .env file');
}

let client: MongoClient;

export async function connectToMongo(): Promise<Db> {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db(dbName);
}

export async function closeMongoConnection() {
    if (client) {
        await client.close();
    }
}
