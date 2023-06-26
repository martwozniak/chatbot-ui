import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ownerId } = req.body;
    const userPrompts = await prisma.prompt.findMany({
        where: {
            ownerId: ownerId,
        },
      })
    res.status(200).json(userPrompts)
}
   
export default handler