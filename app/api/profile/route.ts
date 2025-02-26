/**
 * API route for profile updates
 * This acts as a bridge between client components and server actions
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema/users-schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // Get the current user from Clerk
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Get the user from the database
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkUser.id),
    });
    
    // If user doesn't exist in our database yet, return empty profile
    if (!dbUser) {
      return NextResponse.json({
        success: true,
        data: {
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
          bio: '',
        }
      });
    }
    
    return NextResponse.json({ success: true, data: dbUser });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the current user from Clerk
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Get the user from the database
    let dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkUser.id),
    });
    
    // If user doesn't exist in our database, create them
    if (!dbUser) {
      console.log(`Creating new user for Clerk ID: ${clerkUser.id}`);
      
      const [newUser] = await db.insert(users)
        .values({
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          firstName: body.firstName || clerkUser.firstName || '',
          lastName: body.lastName || clerkUser.lastName || '',
          imageUrl: clerkUser.imageUrl || '',
          bio: body.bio || '',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      
      dbUser = newUser;
    }
    
    // Update the user in the database
    const [updatedUser] = await db
      .update(users)
      .set({
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        updatedAt: new Date(),
      })
      .where(eq(users.id, dbUser.id))
      .returning();

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error in profile API route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
} 