// import { sendMailClient } from "zeptomail";
// const url = ""
// const token = ""

// const client = new sendMailClient(url, token);

// export const sendEmail = async ({to, subject, html, text}: {to: string, subject: string, html: string, text?: string}) => {
//     await client.sendMail({
//         to,
//         subject,
//         html,
//         text,
//         from: "noreply@ostsee-pegel.de",
//     });
// };

import * as sgMail from '@sendgrid/mail';
import { env } from '~/env';

export async function sendEmail({to, subject, html, text}: {to: string, subject: string, html: string, text?: string}) {

    // console.log("sendEmail", env.SENDGRID_API_KEY, to, subject, html, text);
    // sgMail.setApiKey(env.SENDGRID_API_KEY);
    
    // const msg = {
    //     to,
    //     from: 'noreply@ostsee-pegel.de', // Change to your verified sender
    //     subject,
    //     text,
    //     html,
    // }
    
    // await sgMail.send(msg)
    await fetch('https://api.useplunk.com/v1/send', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${env.PLUNK_API_KEY}`
        },
        body: JSON.stringify({
            "to": to,
            "subject": subject,
            "body": html
        })
    });
}
