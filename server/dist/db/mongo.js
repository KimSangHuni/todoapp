"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongodb_1 = require("mongodb");
const username = encodeURIComponent((_a = process.env.MONGO_USERNAME) !== null && _a !== void 0 ? _a : "");
const password = encodeURIComponent((_b = process.env.MONGO_KEY) !== null && _b !== void 0 ? _b : "");
console.log(username, password);
const uri = `mongodb+srv://${username}:${password}@todos.fytot9s.mongodb.net/?retryWrites=true&w=majority&appName=todos`;
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
exports.client = client;
