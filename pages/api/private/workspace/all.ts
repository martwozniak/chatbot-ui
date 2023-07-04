import { NextApiRequest, NextApiResponse } from "next/types"

interface Workspace {
    name: string;
    slug: string;
    logo: string;
}

export const config = {
    runtime: 'edge',
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    
    const workspaces: Workspace[] = [
        { name: 'Legal', slug: 'legal', logo: 'url-to-legal.png' },
        { name: 'Risk & Compliance', slug: 'risk-compliance', logo: 'url-to-risk.png' },
    ];
    
    res.status(200).json(workspaces)
}
   
export default handler