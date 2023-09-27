import nodemailer from "nodemailer"
import sgMail, { MailDataRequired } from "@sendgrid/mail";

/* const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
}); */
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
const sendEmail = async (
    emailTo: string,
    userToken: string
) => {
    /* await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailTo,
        subject: 'Verifique seu email',
        text: "Clique no link para verificar seu email: " + `${process.env.FRONTEND_URL}` + "/verify/" + `${userToken}`,
    }); */
    const msg: MailDataRequired = {
        to: emailTo,
        from: process.env.EMAIL_USER!,
        subject: 'Chatrock verifique seu email',
        text: "Clique no link para verificar seu email: " + `${process.env.FRONTEND_URL}` + "/verify/" + `${userToken}`,
    }
    await sgMail.send(msg)
}

export default sendEmail