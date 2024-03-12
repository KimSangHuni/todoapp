"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const username = encodeURIComponent((_a = process.env.MONGO_USERNAME) !== null && _a !== void 0 ? _a : "");
const password = encodeURIComponent((_b = process.env.MONGO_KEY) !== null && _b !== void 0 ? _b : "");
const uri = `mongodb+srv://${username}:${password}@todos.fytot9s.mongodb.net/?retryWrites=true&w=majority&appName=todos`;
const client = new mongodb_1.MongoClient(uri);
exports.client = client;
const db = client.db("todo-api");
exports.db = db;
