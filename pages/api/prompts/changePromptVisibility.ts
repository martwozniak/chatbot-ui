import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;

    const prompt = await prisma.prompt.findFirst({
        where: {
            id: id,
        },
    });

    const changedStatus = !(prompt?.isPublic);

    const selectedPrompt = await prisma.prompt.update({
        where: {
            id: id,
        },
        data: {
            isPublic: changedStatus,
        }
      })
    res.status(200).json(selectedPrompt)
}
   
export default handler