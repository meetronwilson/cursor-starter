/**
 * Profile header component with user avatar and basic information
 */
"use client";

import Image from "next/image";
import { UserResource } from "@clerk/types";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Calendar } from "lucide-react";

interface ProfileHeaderProps {
  user: UserResource;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  // Format date to readable string
  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "N/A";
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get user's full name
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";
  
  // Get user's profile image
  const profileImage = user.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`;
  
  // Get user's email
  const email = user.emailAddresses[0]?.emailAddress || "No email";
  
  // Get user's creation date
  const createdAt = formatDate(user.createdAt);

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-full md:h-32 md:w-32">
        <Image
          src={profileImage}
          alt={fullName}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{fullName}</h1>
            <p className="text-muted-foreground">@{user.username || user.id}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${email}`}>
              Contact
            </a>
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>{email}</span>
          </div>
          {user.lastSignInAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Last active: {formatDate(user.lastSignInAt)}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>Member since {createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 