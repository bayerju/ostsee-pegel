"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "~/lib/auth-client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
      toast.success("Name updated successfully");
    } catch (error) {
      console.error("Failed to update name:", error);
      toast.error("Failed to update name");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      try {
        await authClient.deleteUser();
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
              toast.success("Account deleted successfully");
              router.push("/");
            },
          },
        });
      } catch (error) {
        console.error("Failed to delete account:", error);
        toast.error("Failed to delete account");
      }
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6 sm:py-10">
      <Card className="border border-white/20 bg-white/5 shadow-lg backdrop-blur-lg">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-xl font-bold sm:text-2xl">
            Account Settings
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
                  placeholder="Enter your name"
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/50"
                />
                <Button
                  onClick={handleUpdateName}
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  Update
                </Button>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h3 className="mb-4 text-lg font-semibold text-red-400">
                Danger Zone
              </h3>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="border-red-500/50 bg-red-500/50 hover:bg-red-500/70"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
