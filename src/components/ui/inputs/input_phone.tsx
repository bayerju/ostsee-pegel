"use client";

import { z } from "zod/v4";
import { Input } from "./input";
import { useEffect, useState } from "react";

export function InputPhone({
  setFullPhoneNumber,
}: {
  setFullPhoneNumber: (phone: string) => void;
}) {
  const [countryCode, setCountryCode] = useState("+49");
  const [phone, setPhone] = useState("");
  //   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let fullPhoneNumber = `${countryCode}${phone}`;
    if (phone.startsWith("0")) {
      fullPhoneNumber = `${countryCode}${phone.slice(1)}`;
    }
    const parsed = z.e164().safeParse(fullPhoneNumber);
    if (parsed.success) {
      setFullPhoneNumber(parsed.data);
      console.log("success", parsed.data);
      //   setError(null);
    } else {
      //   setError("Ungültige Telefonnummer: " + parsed.error.message);
      setFullPhoneNumber("");
    }
  }, [countryCode, phone, setFullPhoneNumber]);

  return (
    <div>
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          id="countryCode"
          value={countryCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCountryCode(e.target.value)
          }
          className="w-1/4"
        />
        <Input
          type="text"
          placeholder="17612345678"
          id="phone"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
        />
      </div>
      {/* {error && <p className="text-red-500">{error}</p>} */}
    </div>
  );
}
