import { NextApiRequest, NextApiResponse } from "next/types"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
   
    const {id} = req.query;

    res.status(200).json(id)
/*    await prisma.food.update({
        where: { id: 1 },
        data: { name: "Rice and Steww" },
      });
*/     
}
   
export default handler