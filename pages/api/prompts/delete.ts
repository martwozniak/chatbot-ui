import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

const prisma = new PrismaClient()

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ name: 'John Doe' })
}
   
export default handler  