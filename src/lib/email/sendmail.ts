import { env } from '~/env';

export async function sendEmail({to, subject, html, text}: {to: string, subject: string, html: string, text?: string}) {
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
