/**
 * Account settings component for managing user account preferences
 */
"use client";

import { useState } from "react";
import { UserResource } from "@clerk/types";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Shield, Bell } from "lucide-react";

interface AccountSettingsProps {
  user: UserResource;
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useAuth();
  const { toast } = useToast();

  // State for notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Handle saving notification preferences
  const handleSavePreferences = async () => {
    setIsLoading(true);

    try {
      // In a real app, you would save these preferences to your database
      // For now, we'll just simulate a successful save
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Preferences saved",
        description: "Your notification preferences have been updated."
      });
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect happens automatically
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again."
      });
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Email section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Email Settings</h3>
          </div>
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Primary Email</p>
              <p className="text-sm text-muted-foreground">
                {user.emailAddresses[0]?.emailAddress || "No email address"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Receive notifications about account activity.
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-xs text-muted-foreground">
                  Receive emails about new features and promotions.
                </p>
              </div>
              <Switch
                id="marketing-emails"
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
            </div>
          </div>
        </div>

        {/* Security section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Security</h3>
          </div>
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">
                Manage your password and security settings.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.open(user.passwordEnabled ? "https://accounts.clerk.dev/user/password" : "https://accounts.clerk.dev/user/password/create", "_blank")}>
              {user.passwordEnabled ? "Change Password" : "Set Password"}
            </Button>
          </div>
        </div>

        {/* Account actions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Account Actions</h3>
          </div>
          <div className="rounded-lg border p-4 space-y-4">
            <Button variant="destructive" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSavePreferences} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </CardFooter>
    </>
  );
} 