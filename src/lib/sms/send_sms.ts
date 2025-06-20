import { Twilio } from 'twilio';
import { env } from '~/env';
import { tryCatch } from '~/lib/try-catch';
// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure

// require the Twilio module and create a REST client
const client = new Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

export async function sendSms(to: string, body: string) {

await client.messages.create({
    to,
    from: '+12186568912',
    body,
  })
  .then(message => console.log(message.sid))
  .catch(error => {
    console.error("error sending sms", "to: ", to, "body: ", body, "error: ", error);
    throw error;
  });
}

export async function sendVerifySms(to: string) {
    const verification = await client.verify.v2?.services(env.TWILIO_VERIFY_SERVICE_SID)
        .verifications
        .create({
            to,
            channel: "sms",
        })
        .catch(error => {
            console.error("error sending verify sms", error)
            throw error
        })

    console.log("verification returned", { verification })
    return verification
}


export async function verifySmsCode(to:string, code:string) {
    const verificationCheck = await client.verify.v2.services(env.TWILIO_VERIFY_SERVICE_SID)
    .verificationChecks
    .create({
        to,
        code,
    })
    .catch(error => {   
        console.error("error verifying sms code", error)
        throw error
    })

    console.log("verificationCheck returned", {verificationCheck})
    return verificationCheck
}
// client.messages
//   .create({
//     to: '+15558675310',
//     from: '+15017122661',
//     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//   })
//   .then(message => console.log(message.sid));