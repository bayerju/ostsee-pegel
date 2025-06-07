"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "~/lib/auth-client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/inputs/input";
import { UserAvatar } from "~/components/auth/user-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const session = authClient.useSession();
  const user = session.data?.user;
  const [name, setName] = useState(user?.name ?? "");

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleUpdateName = async () => {
    try {
      await authClient.updateUser({
        name,
      });
      toast.success("Name erfolgreich aktualisiert");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Namens:", error);
      toast.error("Fehler beim Aktualisieren des Namens");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Sind Sie sicher, dass Sie Ihr Konto löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
      )
    ) {
      try {
        await authClient.deleteUser();
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
              toast.success("Konto erfolgreich gelöscht");
              router.push("/");
            },
          },
        });
      } catch (error) {
        console.error("Fehler beim Löschen des Kontos:", error);
        toast.error("Fehler beim Löschen des Kontos");
      }
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6 sm:py-10">
      <Card className="border border-white/20 bg-white/5 shadow-lg backdrop-blur-lg">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-xl font-bold sm:text-2xl">
            Kontoeinstellungen
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center">
            <UserAvatar user={user} className="size-16" />
            <div>
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                {user.name ?? user.email}
              </h2>
              <p className="text-sm text-white/70">{user.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Geben Sie Ihren Namen ein"
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/50"
                />
                <Button
                  onClick={handleUpdateName}
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  Aktualisieren
                </Button>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h3 className="mb-4 text-lg font-semibold text-red-400">
                Gefahrenbereich
              </h3>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="border-red-500/50 bg-red-500/50 hover:bg-red-500/70"
              >
                Konto löschen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
