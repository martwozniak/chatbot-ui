import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"
import * as z from "zod";

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const result = await saveData(req.body)

    res.status(200).json(result);
}  

const AddNewPromptRequest = z.object({
    id: z.string(),
    prompt: z.string()
});

async function saveData(rawData : any) {
   
   try {
    const data = AddNewPromptRequest.parse(rawData);
    const result = await prisma.prompt.create({
        data: {
          prompt: data.prompt,
          ownerId: data.id,
        },
      });
    return result;
   } catch (e)
   {
    console.log(e);
   }
}

export default handler