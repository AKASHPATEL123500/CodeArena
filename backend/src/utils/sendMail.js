import nodemailer from "nodemailer"

const sendMail = async ( { to, subject, text, html } ) => {

    const transpoter = nodemailer.createTransport(
        {
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        }
    )

    const mailOptions = {
        from: `CodeArena <${ process.env.MAIL_USER }>`,
        to,
        subject,
        text,
        html
    }

    const info = await transpoter.sendMail( mailOptions )
    console.log( "sent mail : ", info.messageId );
}

export { sendMail }