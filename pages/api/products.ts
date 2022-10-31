import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product, Products } from "../../@types";


export default async (req: NextApiRequest,
    res: NextApiResponse<Product>) => {
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