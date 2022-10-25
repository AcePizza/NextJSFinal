// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

type Data = {
  name: string
}


const handler = async (req: NextApiRequest,
  res: NextApiResponse<Data>) => {

  const client = await clientPromise
  const db = client.db('')





  return (
    res.status(200).json({ name: "Some" })
  )
}

export default handler
