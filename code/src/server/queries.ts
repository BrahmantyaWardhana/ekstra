import "server-only";
import { db } from "~/server/db";
import { and, asc, eq, inArray, ne, sql } from "drizzle-orm";
import * as schema from "~/server/db/schema";

// session data query
// find if user is a creator
export async function getCreatorId(userId: string) {
  const creatorPage = await db.query.creatorPages.findFirst({
    where: eq(schema.creatorPages.userId, userId),
  });
  return creatorPage?.id ?? null;
}

// creator queries
// check handle availability
export async function isHandleAvailable(handle: string) {
  const existing = await db.query.creatorPages.findFirst({
    where: eq(schema.creatorPages.pageHandle, handle),
  });
  return !existing; // Returns true if handle is available
}

// create creator page form queries
export async function createMyCreatorPage(
  data: {
    name: string;
    handle: string;
    description: string;
    userId: string;
    userImage: string | null;
  }
) {
  const newCreatorPage = await db.insert(schema.creatorPages).values({
    name: data.name,
    userId: data.userId,
    description: data.description,
    pageHandle: data.handle,
    profileImage: data.userImage,
  });
  return newCreatorPage;
}

// fetch creator account data (for account dropdown so profile image and page name) based on creator page id from session
export async function getMyCreatorPageData(
  data: {
    creatorPageId: string;
  }
) {
  const creatorPageData = 
    await db.select({
      name: schema.creatorPages.name,
      description: schema.creatorPages.description,
      profileImage: schema.creatorPages.profileImage,
      pageHandle: schema.creatorPages.pageHandle,
    })
    .from(schema.creatorPages)
    .where(eq(schema.creatorPages.id, data.creatorPageId))
    .limit(1);

  return creatorPageData
}

export async function getMyCreatorDropdownData(
  data: {
    creatorPageId: string;
  }
) {
  const creatorDropdownData = 
    await db.select({
      name: schema.creatorPages.name,
      profileImage: schema.creatorPages.profileImage,
    })
    .from(schema.creatorPages)
    .where(eq(schema.creatorPages.id, data.creatorPageId))
    .limit(1);

  return creatorDropdownData;
}

export async function createMyMembershipTier( data: {
  title: string;
  price: number;
  description: string;
  creatorPageId: string;

}) {
  const newMembershipTier = 
    await db.insert(schema.memberships).values({
      creatorPageId: data.creatorPageId,
      title: data.title,
      description: data.description,
      price: sql`${data.price}::numeric(10,2)`
    });
  return newMembershipTier
}

export async function getMyMembershipTiers(data: {
  creatorPageId : string
} ) {
  const myMembershipTiers =
    await db.select({
      id: schema.memberships.id,
      title: schema.memberships.title,
      description: schema.memberships.description,
      price: schema.memberships.price,
    })
    .from(schema.memberships)
    .where(eq(schema.memberships.creatorPageId, data.creatorPageId))
    .orderBy(asc(schema.memberships.price));
  return myMembershipTiers
}

export async function createMyContent(data: {
  creatorPageId: string,
  type: string,
  contentKey: string,
  fileName: string,
  size: string,
  usedIn: string,
}) {
  const myContent =
    await db.insert(schema.contents).values({
      creatorPageId: data.creatorPageId,
      type: data.type,
      contentKey: data.contentKey,
      fileName: data.fileName,
      size: data.size,
      usedIn: data.usedIn
    }).returning({ id: schema.contents.id });
  return myContent
}

export async function createMyPost(data: {
  title: string,
  description: string,
  creatorPageId: string,
}) {
  const myPost = 
    await db.insert(schema.posts).values({
      title: data.title,
      description: data.description,
      creatorPageId: data.creatorPageId,
    }).returning({ id: schema.posts.id });
  return myPost
}

export async function createMyPostContent (
  postId: string,
  contentId: string
) {
  const myPostContent =
    await db.insert(schema.postContents).values({
      contentId: contentId,
      postId: postId
    }).returning({ id: schema.postContents.id });
  return myPostContent
}

export async function createMyMembershipExclusivePost( data: {
  postId: string,
  membershipId: string,
}) {
  const membershipExclusivePost =
    await db.insert(schema.membershipContents).values({
      postId: data.postId,
      membershipId: data.membershipId,
    }).returning({ id: schema.membershipContents.id });
  return membershipExclusivePost
}

export async function getMyMembershipName( data : {
  creatorPageId : string
}) {
  const myMembershipNames =
    await db.select({
      id: schema.memberships.id,
      title: schema.memberships.title,
    })
    .from(schema.memberships)
    .where(eq(schema.memberships.creatorPageId, data.creatorPageId))
  return myMembershipNames
}

export async function getMyPostInfo(
  creatorPageId : string
) {
  const results = await db.query.posts.findMany({
    where: (posts, { eq }) => eq(posts.creatorPageId, creatorPageId),
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    columns: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
    },
    with: {
      postContents: {
        columns: {
          contentId: true
        },
        with: {
          content: {
            columns: {
              contentKey: true,
              type: true,
              fileName: true,
              size: true,
            }
          }
        }
      },
      membershipContents: {
        columns: {
          membershipId: true
        },
        with: {
          membership: {
            columns: {
              id: true,
              title: true,
              description: true,
              price: true,
            }
          }
        }
      },
    }
  })
  return results
}

// app queries
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

export async function checkPostOwnership(creatorPageId:string, postId:string) {
  const postCreator = await db.select({
    creatorPageId: schema.posts.creatorPageId
  }) 
  .from(schema.posts)
  .where(eq(schema.posts.id, postId))

  return postCreator[0]?.creatorPageId === creatorPageId
}

export async function getPostInfoById(
  postId : string
) {
  const results = await db.query.posts.findMany({
    where: (posts, { eq }) => eq(posts.id, postId),
    columns: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
    },
    with: {
      postContents: {
        columns: {
          contentId: true
        },
        with: {
          content: {
            columns: {
              contentKey: true,
              type: true,
              fileName: true,
              size: true,
            }
          }
        }
      },
      membershipContents: {
        columns: {
          membershipId: true
        },
        with: {
          membership: {
            columns: {
              id: true,
              title: true,
              description: true,
              price: true,
            }
          }
        }
      },
    }
  })
  return results
}

type UploadedFile = {
  key: string;
  name: string;
  size: number;
  type: string;
};

export async function editPostTransaction(
  postId: string,
  creatorPageId: string,
  data: {
    title?: string;
    description?: string;
    membershipsToAdd?: string[];
    membershipsToRemove?: string[];
    removeAllMemberships?: boolean;
    filesToAdd?: UploadedFile[];
    filesToRemove?: string[];
    
  }
) {
  await db.transaction(async (tx) => {
    // 1. Update post info
    if (data.title !== undefined || data.description !== undefined) {
      await tx.update(schema.posts)
        .set({
          ...(data.title !== undefined ? { title: data.title } : {}),
          ...(data.description !== undefined ? { description: data.description } : {})
        })
        .where(eq(schema.posts.id, postId));
    }

    // 2. Update memberships
    if (data.removeAllMemberships) {
      await tx.delete(schema.membershipContents)
        .where(eq(schema.membershipContents.postId, postId));
    } else {
      if (data.membershipsToAdd?.length) {
        await tx.insert(schema.membershipContents).values(
          data.membershipsToAdd.map(membershipId => ({
            postId,
            membershipId
          }))
        );
      }
      if (data.membershipsToRemove?.length) {
        await tx.delete(schema.membershipContents)
          .where(
            and(
              inArray(schema.membershipContents.membershipId, data.membershipsToRemove),
              eq(schema.membershipContents.postId, postId)
            )
          );
      }
    }

    // 3. Update files
    if (data.filesToRemove?.length) {
      // First delete from postContents based on related content IDs
      await tx.delete(schema.postContents)
        .where(
          inArray(
            schema.postContents.contentId,
            tx.select({ id: schema.contents.id })
              .from(schema.contents)
              .where(inArray(schema.contents.contentKey, data.filesToRemove))
          )
        );

      // Then delete from contents
      await tx.delete(schema.contents)
        .where(inArray(schema.contents.contentKey, data.filesToRemove));
    }

    if (data.filesToAdd?.length) {
      const contentIds = await tx.insert(schema.contents).values(
        data.filesToAdd.map(f => ({
          creatorPageId: creatorPageId,
          type: f.type,
          contentKey: f.key,
          fileName: f.name,
          size: String(f.size),
          usedIn: "post",
        }))
      ).returning({ id: schema.contents.id });

      await tx.insert(schema.postContents).values(
        contentIds.map(c => ({
          postId: postId,
          contentId: c.id,
        }))
      )
    }
  });
}

export async function deletePost(postId: string) {
  await db.transaction(async (tx) => {
    // 1. Delete membership links
    await tx
      .delete(schema.membershipContents)
      .where(eq(schema.membershipContents.postId, postId));

    // 2. Get all content IDs linked to this post
    const postContentRecords = await tx
      .select({ contentId: schema.postContents.contentId })
      .from(schema.postContents)
      .where(eq(schema.postContents.postId, postId));

    const contentIds = postContentRecords.map((pc) => pc.contentId);

    // 3. Delete post-content links
    await tx
      .delete(schema.postContents)
      .where(eq(schema.postContents.postId, postId));

    // 4. Remove unused contents
    if (contentIds.length > 0) {
      // Find which are still used in other posts
      const usedInOtherPosts = await tx
        .select({ contentId: schema.postContents.contentId })
        .from(schema.postContents)
        .where(
          and(
            inArray(schema.postContents.contentId, contentIds),
            ne(schema.postContents.postId, postId)
          )
        );

      // Find which are used in store listings (if you have storeContents)
      const usedInStore = await tx
        .select({ contentId: schema.storeContents.contentId })
        .from(schema.storeContents)
        .where(inArray(schema.storeContents.contentId, contentIds));

      const usedContentIds = new Set([
        ...usedInOtherPosts.map((u) => u.contentId),
        ...usedInStore.map((u) => u.contentId),
      ]);

      const unusedContentIds = contentIds.filter(
        (id) => !usedContentIds.has(id)
      );

      if (unusedContentIds.length > 0) {
        await tx
          .delete(schema.contents)
          .where(inArray(schema.contents.id, unusedContentIds));
      }
    }

    // 5. Finally, delete the post
    await tx.delete(schema.posts).where(eq(schema.posts.id, postId));
  });
}

export async function checkMembershipCreator(creatorPageId:string, membershipId:string) {
  const membershipCreator = await db.select({
    creatorPageId: schema.memberships.creatorPageId
  }) 
  .from(schema.memberships)
  .where(eq(schema.memberships.id, membershipId))

  return membershipCreator[0]?.creatorPageId === creatorPageId
}

export async function getMembershipInfoById(membershipId:string) {
  const myMembershipInfo =
    await db.select({
      id: schema.memberships.id,
      title: schema.memberships.title,
      description: schema.memberships.description,
      price: schema.memberships.price,
    })
    .from(schema.memberships)
    .where(eq(schema.memberships.id, membershipId))
  return myMembershipInfo
}

export async function editMembershipInfo(
  id: string, data: {
    description: string;
    title: string;
    price: number;
  }
) {
  await db
    .update(schema.memberships)
    .set({
      title: data.title,
      description: data.description,
      price: String(data.price),
    })
    .where(eq(schema.memberships.id, id));
}