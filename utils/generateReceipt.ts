import { Product } from "../interfaces/product";
import { formatDate } from "./formatDate";
import { formatPrice } from "./formatPrice";

export const generateReceipt = ({
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
  country: string;
  shipping: number;
  state: string;
}) => {
  let productsTotal = 0;
  let productsHtml = ``;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    productsTotal += product.price;
    productsHtml = `
        ${productsHtml}
        <tr>
            <th>${i + 1}</th>
            <th>${product.title}</th>
            <th>${formatPrice(product.price)}$</th>
            <th>1</th>
            <th>${formatPrice(product.price)}$</th>
        </tr>
    `;
  }

  const total = productsTotal + shipping;

  const receiptHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Rēķins</title>
        <style>
        * {
          margin: 0;
          font-size: 10px;
        }
  
        h1 {
          font-size: 30px;
          color: #000000;
        }
  
        p {
          font-weight: normal;
          line-height: 14px;
        }
  
        strong {
          font-size: 10px;
        }
  
        .invoice-box {
          max-width: 500px;
          height: 100%;
          padding: 20px;
          font-family: "Helvetica Neue", "Helvetica";
          color: #555;
        }
  
        .flex {
          display: flex;
          flex-direction: row;
        }
  
        .mt-100 {
          margin-top: 20px;
        }
  
        .flex-col {
          flex-direction: column;
        }
  
        .items-start {
          align-items: start;
        }
  
        .items-center {
          align-items: center;
        }
  
        .items-between {
          align-items: space-between;
        }
  
        .justify-start {
          justify-content: start;
        }
  
        .justify-center {
          justify-content: center;
        }
  
        .justify-end {
          justify-content: flex-end;
        }
  
        .justify-between {
          justify-content: space-between;
        }
  
        .w-full {
          width: 100%;
        }
  
        .header {
          margin-bottom: 40px;
        }
  
        .font-bold {
          font-weight: bold;
        }
  
        .products {
          width: 100%;
          margin-top: 20px;
        }
  
        .font-italic {
          font-style: italic;
        }
  
        .gap-100 {
          gap: 20px;
        }
  
        .border-big {
          width: 100%;
          height: 3px;
          background-color: rgb(65, 65, 65);
          border-radius: 5px;
          margin-bottom: 5px;
        }
  
        .w-half {
          width: 50%;
        }
  
        .border-t {
          border-top: 2px solid #333;
          margin-top: 5px;
          padding-top: 5px;
        }
  
        .mt-20 {
          margin-top: 5px;
        }
  
        .mt-50 {
          margin-top: 10px;
        }
  
        th {
          padding: 5px;
        }
  
        tbody > tr > th {
          font-weight: normal;
        }
  
        tbody > tr:nth-child(odd) {
          background: rgb(243, 243, 243);
        }
      </style>
      </head>
      <body>
        <div class="invoice-box">
          <div class="w-full flex justify-between items-start">
            <h1>Invoice</h1>
    
            <div class="flex flex-col">
              <strong>APPLLLE Inc.</strong>
              <p>123. silicon street</p>
              <p>City, California</p>
              <p>9786</p>
              <p>United States</p>
              <p>1-888-123-1234</p>
            </div>
          </div>
    
          <div class="mt-100 flex justify-between items-start">
            <div class="flex flex-col items-start justify-start">
              <strong>Billed to</strong>
              <p>${name}</p>
              <p>${address}</p>
              <p>${city}, ${state}</p>
              <p>9786</p>
              <p>${country}</p>
              <p>${phoneNumber}</p>
            </div>
    
            <div class="flex items-start justify-end gap-100">
              <div class="flex flex-col items-start justify-start">
                <strong>Date issued</strong>
                <p>${formatDate(new Date())}</p>
              </div>
    
              <div class="flex flex-col items-start justify-start">
                <strong>Invoice Nr.</strong>
                <p>INV-10012</p>
              </div>
    
              <div class="flex flex-col items-start justify-start">
                <strong>Paid</strong>
                <p>${formatPrice(total)}$</p>
              </div>
            </div>
          </div>
    
          <div class="flex flex-col mt-100 w-full">
            <div class="border-big"></div>
            <table>
              <thead>
                <tr>
                  <th>Nr.</th>
                  <th>DESCRIPTION</th>
                  <th>RATE</th>
                  <th>QTY</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                 ${productsHtml}   
              </tbody>
            </table>
          </div>
    
          <div class="flex w-full items-start justify-end mt-50">
            <div class="flex w-half flex-col items-start justify-start">
              <div class="w-full flex items-center justify-between">
                <p>Subtotal</p>
                <p>${formatPrice(productsTotal)}$</p>
              </div>
              <div class="w-full flex items-center justify-between">
                <p>Shipping</p>
                <p>${formatPrice(shipping)}$</p>
              </div>
              <div class="w-full flex items-center justify-between">
                <p>Tax</p>
                <p>4.32$</p>
              </div>
              <div class="w-full flex items-center justify-between border-t">
                <p>Total</p>
                <p>${formatPrice(total)}$</p>
              </div>
              <small class="font-italic mt-20">(Paid with card)</small>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;

  return receiptHtml;
};
