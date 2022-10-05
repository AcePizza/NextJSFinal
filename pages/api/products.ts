import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {

}

export default async (req: NextApiRequest,
    res: NextApiResponse<Data>) => {
    try {
        const client = await clientPromise;
        const db = client.db("NEXTjsStore");

        const products = await db
            .collection("Products")
            .find({})
            .limit(10)
            .toArray();
        res.json(products);
    } catch (e) {
        console.error(e);
    }
};