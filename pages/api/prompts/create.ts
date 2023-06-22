import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const {id} = req.query;
    const {prompt} = req.query;

    if(!id || !prompt || prompt === undefined || id === undefined || id === null || prompt === null){
        res.status(404);
    }

    const result = await prisma.prompt.create({
        data: {
          prompt: prompt as string,
          ownerId: id as string,
        },
      });
    console.log(id,prompt)
    res.status(200).json({id,prompt})
}  

export default handler