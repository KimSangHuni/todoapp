"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongo_1 = require("../../db/mongo");
const router = (0, express_1.Router)();
router.get('todos', (req, res) => {
    const db = mongo_1.client.db("tasks");
    console.log(db.databaseName);
    res.status(200).json({});
});
exports.default = router;
