import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export const config = {
  runtime: 'edge',
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("workspace", req.body.workspace, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );
  res.status(200).json({ success: true });
};