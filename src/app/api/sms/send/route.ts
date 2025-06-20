import { NextResponse } from "next/server";
import { sendSms } from "~/lib/sms/send_sms";

export async function POST(request: Request) {
  try {
    // const to ="+491635392235"
    const to = "+4917657952373"// "+18777804236"
    const from = "+121865689812"
    const body = "Eine kleine testnachricht, schreib mir doch mal bei Telegram, wenn du sie gekriegt hast. Liebe dich, Julian"

    if (!to || !body) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await sendSms(to, body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send SMS:", error);
    return NextResponse.json(
      { error: "Failed to send SMS" },
      { status: 500 }
    );
  }
}
