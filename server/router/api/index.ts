import { Router } from "express";
import { client, db } from "../../db/mongo";
import { ObjectId } from "mongodb";

const router = Router();

router.get('/todos', async (req, res) => {
    try {
        const query = req.query;
        const filter:any = {};
        
        for (const key in query) {
            if (Object.prototype.hasOwnProperty.call(query, key)) {
                if(JSON.parse(query[key] as string)) {
                    filter[key] = JSON.parse(query[key] as string);
                }
            }
        }

        const collection = db.collection("tasks");
        const data = await collection.find({...filter}).toArray();
        res.status(200).json({ response: data });
    }
    catch (e) {
        res.status(500);
    }
    finally {
        // client.close();
    }
})

router.post('/todos', async (req, res) => {
    try {
        const data = req.body?.data;
        const collection = db.collection("tasks");

        const result = await collection.insertOne({
            ...data, _id: new ObjectId()
        });

        res.status(200).json({ response: result });
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
})

router.put('/todos', async (req, res) => {
    try {
        const { _id, ...data } = req.body?.data;

        if (!_id) {
            new Error("bad request");
        }

        const filter = { _id: new ObjectId(_id) };
        const update = {
            $set: { ...data }
        }

        const collection = db.collection("tasks");
        const result = await collection.updateOne(filter, update);

        if (result.matchedCount > 0) {
            res.status(200).json({ success: true, message: '데이터가 성공적으로 업데이트되었습니다.' });
        } else {
            res.status(404).json({ success: false, message: '해당 ID의 데이터를 찾을 수 없습니다.' });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
})

router.delete('/todos/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        console.log("delete", _id);

        if (!_id) {
            new Error("bad request");
        }

        const collection = db.collection("tasks");
        const result = await collection.deleteOne({ _id: new ObjectId(_id) });

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: '데이터가 성공적으로 삭제되었습니다.' });
        } else {
            res.status(404).json({ success: false, message: '해당 ID의 데이터를 찾을 수 없습니다.' });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
})


export default router;