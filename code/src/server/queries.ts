import "server-only";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import * as schema from "~/server/db/schema";

// session data query
// find if user is a creator
export async function getCreatorId(userId: string) {
  const creatorPage = await db.query.creatorPages.findFirst({
    where: eq(schema.creatorPages.userId, userId),
  });
  return creatorPage?.id ?? null;
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
