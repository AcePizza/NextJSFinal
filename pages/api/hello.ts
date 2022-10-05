// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}


const handler = (req: NextApiRequest,
  res: NextApiResponse<Data>) => {

  console.log('req :>> ', req.body);

  if (req.body.username === "mor_2314") {
    return res.status(200).json({ name: "This is a test" })
  }

  return (
    res.status(200).json({ name: 'John Doe' })
  )
}

export default handler
