import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "./email/sendmail";
import { ResetPasswordEmail } from "./email/templates/reset_password_email";
// https://react.email/docs/utilities/render
import { render } from '@react-email/render';
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    user: {
        deleteUser: {
            enabled: true,
        },
    },
    emailAndPassword: {  
        enabled: true,
        sendResetPassword: async ({user, url, token}) => {
            console.log("sendResetPassword", user, url, token);
            await sendEmail({
                to: user.email,
                subject: "Passwort zurücksetzen",
                html: `<p>Klicken Sie <a href="${url}">hier</a>, um Ihr Passwort zurückzusetzen.</p>`,
                // text: await render(<ResetPasswordEmail />)
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
