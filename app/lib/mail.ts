import nodemailer from "nodemailer";

export const sendTwoFactorTokenEmail = async (email: string) => {
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
    console.log(testResult);
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Awramart.Your Order",
      html: `<p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh <br/> Surprise you got cheated on 😂 <br/> Say good by to your money <br/> Dont't trust awramart </p>`,
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
