"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./router/api"));
const common_1 = __importDefault(require("./router/common"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
const username = encodeURIComponent((_a = process.env.MONGO_USERNAME) !== null && _a !== void 0 ? _a : "");
const password = encodeURIComponent((_b = process.env.MONGO_KEY) !== null && _b !== void 0 ? _b : "");
console.log(username, password);
app.use((0, cors_1.default)());
app.use('api/', api_1.default);
app.use('comm/', common_1.default);
app.get('/', (req, res) => {
    res.send('Typescript + Node.js + Express Server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
