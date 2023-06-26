import { NextApiRequest, NextApiResponse } from "next/types"

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    res.status(200).json("Test")
}
   
export default handler