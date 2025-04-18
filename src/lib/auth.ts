import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "./email/sendmail";
// https://react.email/docs/utilities/render
import { render } from '@react-email/render';
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {  
        enabled: true,
        sendResetPassword: async ({user, url, token}) => {
            console.log("sendResetPassword", user, url, token);
            await sendEmail({
                to: user.email,
                subject: "Passwort zurücksetzen",
                html: `<p>Klicken Sie <a href="${url}">hier</a>, um Ihr Passwort zurückzusetzen.</p>`,
                // text: await render(<p>Klicken Sie <a href="${url}">hier</a>, um Ihr Passwort zurückzusetzen.</p>))
            });
            console.log("sendResetPassword", user, url, token);
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({user, url, token}, request) => {
            console.log("sendVerificationEmail", user, url, token, request);
        }
    }
});
