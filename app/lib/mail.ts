import nodemailer from "nodemailer";
import prisma from "./db";
type ProductItem = {
  id: string;
  quantity: number;
};

const getProductDetails = async (productIds: string[]) => {
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      images: true,
      name: true,
      price: true,
      NewPrice: true,
      id: true,
    },
  });
  return products;
};
export const sendTwoFactorTokenEmail = async (
  email: string,

  NumCommande: string,
  products: ProductItem[],
  total: Number,
  fullName: string | null
) => {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
  } catch (error) {
    console.error({ error });
    return;
  }
  const productIds = products.map((p) => p.id);
  const productDetails = await getProductDetails(productIds);

  const productwithQuantity = productDetails.map((product) => {
    const matchingProduct = products.find((p) => p.id === product.id);
    return matchingProduct
      ? { ...product, quantity: matchingProduct.quantity }
      : { ...product, quantity: 1 };
  });
  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Awramart.Your Order",
      html: `
     <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Order - Awramart</title>
    <style>
        body, table, td, div, p, a {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        body {
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
            width: 100% !important;
            height: 100% !important;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            margin-top: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
            padding: 30px 0;
            text-align: center;
        }
        .logo {
            width: 120px;
            height: auto;
            margin-bottom: 15px;
        }
        .section {
            padding: 30px;
            background-color: #ffffff;
        }
        .order-number {
            background-color: #f8f9fa;
            border-left: 4px solid #1a1a1a;
            padding: 15px;
            margin: 20px 0;
        }
        .product-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #eee;
            margin: 10px 0;
        }
        .total-section {
            background-color: #1a1a1a;
            color: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .tracking-button {
            display: inline-block;
            padding: 15px 30px;
            background-color: #1a1a1a;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
            transition: background-color 0.3s ease;
        }
        .tracking-button:hover {
            background-color: #333333;
        }
        .social-links {
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .social-icon {
            display: inline-block;
            margin: 0 10px;
            padding: 10px;
            background-color: #1a1a1a;
            color: white;
            text-decoration: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
        }
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
                border-radius: 0 !important;
            }
            .section {
                padding: 20px;
            }
            .product-item {
                flex-direction: column;
                text-align: start;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 0 auto;">
        <tr>
            <td>
                <div class="email-container">
                    <div class="header">
                        
                        <h1 style="color: white; margin: 0; font-size: 24px;">Order Confirmation</h1>
                    </div>
                    <div class="section">
                        <h2 style="color: #1a1a1a; margin-bottom: 20px;">Thank you ${
                          fullName || ""
                        }!</h2>
                        <p style="color: #666666;">Your order has been successfully confirmed. We thank you for your trust.</p>
                        <div class="order-number">
                            <strong>Order Number :</strong> ${NumCommande}
                        </div>

                        ${productwithQuantity
                          .map(
                            (p) => `
                                   <div class="product-item" key="${
                                     p.id
                                   }" style="display: flex; justify-content: space-between; align-items: center;">
    <img src="${
      p.images[0]
    }" width="80" height="80" style="flex-shrink: 0; border-radius:5px;"/>
    <div style="text-align: right;">
        <h4 style="margin: 0; color: #1a1a1a;">${p.name}</h4>
        <p style="font-weight: bold; color: #1a1a1a;margin: 5px 0;">Price: ${
          p.NewPrice || p.price
        } AED</p>
        <p style="color: #666666; margin: 5px 0;">Quantity: ${p.quantity}</p>
    </div>
</div>`
                          )
                          .join("")}

                        <div class="total-section">
                            <table width="100%">
                                <tr>
                                    <td style="font-size: 16px; font-weight: bold;">Total</td>
                                    <td align="right" style="font-size: 16px; font-weight: bold;">${total} AED</td>
                                </tr>
                            </table>
                        </div>

                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>

    `,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
  // await resend.emails.send({
  //   from: " Dev<onboarding@resend.dev>",
  //   to: email,
  //   subject: "2FA Code",
  //   html: `<p>Your 2FA code: ${token}</p>`,
  // });
};
