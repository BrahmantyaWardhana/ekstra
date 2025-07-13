import "server-only";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import * as schema from "~/server/db/schema";
import { auth } from "~/server/auth";

// session data query
// find if user is a creator
export async function getCreatorId(userId: string) {
  const creatorPage = await db.query.creatorPages.findFirst({
    where: eq(schema.creatorPages.userId, userId),
  });
  return creatorPage?.id ?? null;
}

// create creator page form queries
export async function createCreatorPage(
  data: { 
    name: string; 
    handle: string; 
    description: string; 
  }
) {

  const user = await auth();
  const userId = user?.user?.id;
  const userImage = user?.user?.image;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const newCreatorPage = await db.insert(schema.creatorPages)
    .values({
      name: data.name,
      userId: userId,
      description: data.description,
      pageUrl: data.handle, 
      profileImage: userImage,
    })
}

// images queries
export async function getBackground() {
  const backgroundImages = await db.query.appImages.findMany({
    columns: {
      url: true,
    },
    orderBy: (model, { desc }) => [desc(model.id)],
    limit: 3,
  });
  return backgroundImages;
}
