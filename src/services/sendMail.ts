import nodemailer from "nodemailer";

export async function sendMail(email: string, url: string) {
  const transporter = nodemailer.createTransport({
    // @ts-ignore
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Codetree 👻" <Codetree@codetree.io>', // sender address
    to: email, // list of receivers
    subject: "Codetree", // Subject line
    text: "Codetree notification", // plain text body
    html: `<a href=${url}>${url}</a>`, // html body
  });
}
