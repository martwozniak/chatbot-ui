import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const prompts = await prisma.prompt.findFirst();
    res.status(200).json(prompts);
}
   
export default handler