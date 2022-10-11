import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const db = client.db("NEXTjsStore")

        const users = await db
            .collection("Users")
            .find({})
            .limit(10)
            .toArray();
        res.json(users)
    } catch (e) {
        console.error(e)
    }
}