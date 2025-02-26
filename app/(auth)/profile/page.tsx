/**
 * User profile page with Clerk integration
 * Displays user information and allows editing profile details
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileHeader } from "./_components/profile-header";
import { ProfileForm } from "./_components/profile-form";
import { AccountSettings } from "./_components/account-settings";
import { useAuth, useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  // Handle loading state
  if (!isLoaded) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not signed in
  if (!isSignedIn || !user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="container max-w-6xl py-8">
      <ProfileHeader user={user} />
      
      <Separator className="my-6" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <ProfileForm user={user} />
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <AccountSettings user={user} />
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
} 