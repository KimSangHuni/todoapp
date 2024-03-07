import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const username = encodeURIComponent(process.env.MONGO_USERNAME ?? "");
const password = encodeURIComponent(process.env.MONGO_KEY ?? "");

const uri = `mongodb+srv://${username}:${password}@todos.fytot9s.mongodb.net/?retryWrites=true&w=majority&appName=todos`;

const client = new MongoClient(uri);
const db = client.db("todo-api");

export { client, db };