import { NextApiRequest, NextApiResponse } from "next";
import { mailCtrl } from "../../../controllers/mailController";

const { send } = mailCtrl;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await send(req, res);
      break;
  }
};
