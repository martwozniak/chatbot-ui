import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //const prompts = await prisma.prompt.findMany()
    const {id} = req.query;
    // const result = await prisma.prompt.create({
    //     data: {
    //       prompt: "Jollof Rice",
    //       ownerId: '1'
    //     },
    //   });
    console.log(id)
    res.status(200).json(id)
}
   
export default handler