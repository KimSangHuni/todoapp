"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongo_1 = require("../../db/mongo");
const mongodb_1 = require("mongodb");
const router = (0, express_1.Router)();
router.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = mongo_1.db.collection("tasks");
        const data = yield collection.find().toArray();
        res.status(200).json({ response: data });
    }
    catch (e) {
        res.status(500);
    }
    finally {
        // client.close();
    }
}));
router.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = (_a = req.body) === null || _a === void 0 ? void 0 : _a.data;
        const collection = mongo_1.db.collection("tasks");
        const result = yield collection.insertOne(Object.assign(Object.assign({}, data), { _id: new mongodb_1.ObjectId() }));
        res.status(200).json({ response: result });
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}));
router.put('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const _c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.data, { _id } = _c, data = __rest(_c, ["_id"]);
        if (!_id) {
            new Error("bad request");
        }
        const filter = { _id: new mongodb_1.ObjectId(_id) };
        const update = {
            $set: Object.assign({}, data)
        };
        const collection = mongo_1.db.collection("tasks");
        const result = yield collection.updateOne(filter, update);
        if (result.matchedCount > 0) {
            res.status(200).json({ success: true, message: '데이터가 성공적으로 업데이트되었습니다.' });
        }
        else {
            res.status(404).json({ success: false, message: '해당 ID의 데이터를 찾을 수 없습니다.' });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}));
router.delete('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        console.log("delete", _id);
        if (!_id) {
            new Error("bad request");
        }
        const collection = mongo_1.db.collection("tasks");
        const result = yield collection.deleteOne({ _id: new mongodb_1.ObjectId(_id) });
        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: '데이터가 성공적으로 삭제되었습니다.' });
        }
        else {
            res.status(404).json({ success: false, message: '해당 ID의 데이터를 찾을 수 없습니다.' });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}));
exports.default = router;
