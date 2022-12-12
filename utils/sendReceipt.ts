import easyinvoice from "easyinvoice";
import sgMail from "@sendgrid/mail";

export const sendReceipt = async (receipt: string, email: string) => {
  const sg_api_key = process.env.SENDGRID_API_KEY;
  if (!sg_api_key) {
    return false;
  }

  const encodedHtml = convertToBase64(receipt);

  let encodedPdf: string | null = null;

  const data = {
    customize: {
      template: encodedHtml,
    },
  };

  await easyinvoice.createInvoice(data as any, (result) => {
    encodedPdf = result.pdf;
  });

  sgMail.setApiKey(sg_api_key);

  const msg = {
    to: "robzlegz@gmail.com",
    from: "robzlegz@gmail.com",
    subject: "Invoice",
    text: "Invoice from today",
    attachments: [
      {
        filename: "invoice.pdf",
        type: "application/pdf",
        disposition: "attachment",
        content: encodedPdf,
        contentId: "1",
      },
    ],
  } as any;

  const sendRes = await sgMail.send(msg);

  const statusCode = sendRes[0].statusCode;

  if (statusCode === 202) {
    return true;
  }

  return false;
};

export const convertToBase64 = (payload: any) => {
  return Buffer.from(String(payload)).toString("base64");
};
