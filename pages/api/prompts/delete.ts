import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;

    const deletedPrompt = await prisma.prompt.delete({
        where: {
            id: id,
        },
    });
  
    res.status(200).json(deletedPrompt)
}
   
export default handler