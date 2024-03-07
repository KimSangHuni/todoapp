import { MongoClient, ServerApiVersion } from "mongodb";

const username = encodeURIComponent(process.env.MONGO_USERNAME ?? "");
const password = encodeURIComponent(process.env.MONGO_KEY ?? "");

console.log(username, password);
const uri = `mongodb+srv://${username}:${password}@todos.fytot9s.mongodb.net/?retryWrites=true&w=majority&appName=todos`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

export { client };