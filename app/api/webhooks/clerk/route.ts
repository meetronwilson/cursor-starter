/**
 * Clerk webhook handler for user synchronization
 */
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return new NextResponse("Missing webhook secret", { status: 500 });
  }

  // Get the headers
  const headerPayload = req.headers;
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with the secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error verifying webhook", { status: 400 });
  }

  // Get the event type
  const eventType = evt.type;

  // Handle the event based on the type
  try {
    switch (eventType) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;
        const primaryEmail = email_addresses?.[0]?.email_address;

        if (!primaryEmail) {
          return new NextResponse("Missing email address", { status: 400 });
        }

        // Create a new user in the database
        await db.insert(users).values({
          clerkId: id as string,
          email: primaryEmail,
          firstName: first_name || null,
          lastName: last_name || null,
          imageUrl: image_url || null,
        });

        break;
      }
      case "user.updated": {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;
        const primaryEmail = email_addresses?.[0]?.email_address;

        if (!primaryEmail) {
          return new NextResponse("Missing email address", { status: 400 });
        }

        // Find the user in the database
        const existingUser = await db.query.users.findFirst({
          where: eq(users.clerkId, id as string),
        });

        if (!existingUser) {
          // If the user doesn't exist, create a new one
          await db.insert(users).values({
            clerkId: id as string,
            email: primaryEmail,
            firstName: first_name || null,
            lastName: last_name || null,
            imageUrl: image_url || null,
          });
        } else {
          // Update the existing user
          await db
            .update(users)
            .set({
              email: primaryEmail,
              firstName: first_name || null,
              lastName: last_name || null,
              imageUrl: image_url || null,
            })
            .where(eq(users.clerkId, id as string));
        }

        break;
      }
      case "user.deleted": {
        const { id } = evt.data;

        // Delete the user from the database
        await db.delete(users).where(eq(users.clerkId, id as string));

        break;
      }
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Error processing webhook", { status: 500 });
  }
} 