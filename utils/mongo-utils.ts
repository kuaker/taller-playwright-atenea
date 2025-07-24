// utils/mongo-utils.ts
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // Cambiá esto si usás Atlas u otro host
const dbName = "bank";

let client: MongoClient;

export async function connectToMongo() {
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
