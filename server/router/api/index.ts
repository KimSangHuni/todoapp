import { Router } from "express";
import { client } from "../../db/mongo";

const router = Router();

const db = client.db("todo-api");

router.get('/todos', async(req, res) => {
    const collection = db.collection("tasks");
    const data = await collection.find().toArray();
    res.status(200).json({
        response: data
    })
})


export default router;