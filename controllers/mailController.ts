import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../interfaces/product";
import { generateReceipt } from "../utils/generateReceipt";
import { sendReceipt } from "../utils/sendReceipt";

export const mailCtrl = {
  send: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      products,
      email,
      name,
      phoneNumber,
      address,
      city,
      country,
      shipping,
      state,
    }: {
      products: Product[];
      email: string;
      name: string;
      phoneNumber: string;
      address: string;
      city: string;
      state: string;
      country: string;
      shipping: number;
    } = req.body;

    const receipt = generateReceipt({
      products,
      email,
      name,
      phoneNumber,
      address,
      city,
      country,
      shipping,
      state,
    });

    const receiptSent = await sendReceipt(receipt, email);

    res.json({
      sent: receiptSent,
    });
  },
};
