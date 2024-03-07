import { Router } from "express";
import { client } from "../../db/mongo";

const router = Router();

router.get('todos', (req, res) => {
    const db = client.db("tasks");
    console.log(db.databaseName);

    res.status(200).json({
        
    })
})


export default router;