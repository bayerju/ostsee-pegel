"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { useSignIn } from "@clerk/nextjs";
import { tryCatch } from "~/lib/try-catch";
import { toast } from "sonner";
import { authClient } from "~/lib/auth-client";

export function ForgotPasswordDialog(props: { email: string }) {
  const [email, setEmail] = useState(props.email);
  // const { isLoaded, signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    console.log("ForgotPasswordDialog rendered");
  }, []);
  useEffect(() => {
    console.log("ForgotPasswordDialog email changed", email);
    setEmail(props.email);
  }, [props.email]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="mt-2 p-0 text-blue-300 hover:text-blue-400"
          onFocus={(e) => {
            console.log("Trigger button focused", e.relatedTarget);
          }}
          onBlur={(e) => {
            console.log("Trigger button blurred", e.relatedTarget);
          }}
        >
          Passwort vergessen?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Passwort vergessen?</DialogTitle>
        <DialogDescription>
          Geben Sie Ihre E-Mail Adresse ein und wir senden Ihnen einen Link zum
          Zurücksetzen Ihres Passworts.
          <Input
            type="email"
            name="email"
            className="my-3"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoFocus
          />
          {error && <p className="text-red-500">{error}</p>}
        </DialogDescription>
        <DialogFooter>
          {isSuccess ? (
            <p>Email wurde gesendet</p>
          ) : (
            <Button
              disabled={isLoading}
              onClick={async () => {
                await authClient.forgetPassword(
                  {
                    email: email,
                    redirectTo: "/account/update-password",
                  },
                  {
                    onRequest: (ctx) => {
                      console.log("sendForgetPassword request", ctx);
                      setIsLoading(true);
                    },
                    onSuccess: (data) => {
                      console.log("sendForgetPassword success", data);
                      setIsLoading(false);
                      setIsSuccess(true);
                    },
                    onError: (error) => {
                      console.log("sendForgetPassword error", error);
                      setIsLoading(false);
                      setError(error.error.message);
                    },
                  },
                );
                // setIsLoading(true);
                // const { data, error } = await tryCatch(
                //   signIn.create({
                //     strategy: "email_link",
                //     identifier: email,
                //     redirectUrl:
                //       "http://localhost:3000/account/update-password",
                //   }),
                // );
                // console.log("signin status: ", signIn.status);
                // console.log("signin result: ", error, data);
                // if (error) {
                //   setIsLoading(false);
                //   setError(error.message);
                //   return;
                // }
                // setIsSuccess(true);
                // toast.success("E-Mail wurde gesendet");
              }}
            >
              Senden
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </>
  );
}
