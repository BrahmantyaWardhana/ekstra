'use server';

import { auth } from '~/server/auth';
import * as queries from '~/server/queries';
import { utapi } from './uploadthing';
import type { FileEsque } from 'uploadthing/types';

export async function checkHandleUnique(handle: string) {
  try{
    return await queries.isHandleAvailable(handle);
  } catch (error) {
    return null
  }
}

export async function submitCreatorPage(data: {
  name: string;
  handle: string;
  description: string;
}) {
  const user = await auth();
  const userId = user?.user?.id;
  const userImage = user?.user?.image;

  if (!userId || !userImage) {
    throw new Error('User not authenticated');
  }

  try {
    await queries.createMyCreatorPage({
      ...data,
      userId,
      userImage,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create creator page' };
  }
}

export async function retrieveCreatorDropdownData() {
  const user = await auth();
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    return null;
  }
  try {
    const creatorDropdownData = await queries.getMyCreatorDropdownData({creatorPageId});
    return creatorDropdownData
  } catch (error) {
    return null;
  }
}

export async function retrieveCreatorPageData() {
  const user = await auth();
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    return null;
  }
  try {
    const creatorDropdownData = await queries.getMyCreatorPageData({creatorPageId});
    return creatorDropdownData
  } catch (error) {
    return null;
  }
}

export async function submitMembershipTierInfo( data:{
  title: string;
  price: number;
  description: string;
}) {

  const user = await auth();
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    return null;
  }

  try {
    await queries.createMyMembershipTier({
      ...data,
      creatorPageId
    })
    return { success: true };
  } catch(error) {
    return { success: false, error: 'Failed to create creator page' };
  }
}

export async function retrieveMyMembershipTiers() {
  const user = await auth();
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    return null;
  }

  try {
    const myMembershipTiers =
      await queries.getMyMembershipTiers({
        creatorPageId
      })
    return myMembershipTiers
  } catch(error) {
    return null
  }
}

export async function retrieveMembershipNames() {
  const user = await auth();
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    return null;
  }
  try {
    const myMembershipNames =
      await queries.getMyMembershipName({
        creatorPageId
      })
    return myMembershipNames
  } catch(error) {
    return null
  }
}

export async function removeFileFromUt(
  key: string
) {
  await utapi.deleteFiles(key);
}

export async function uploadFileToUt(formData: FormData) {
  const entries = formData.getAll("files");
  const files = entries.filter((e): e is File => e instanceof File);

  if (files.length === 0) return [];
  const uploaded = await utapi.uploadFiles(files);
  return uploaded;
}

export async function submitPostData(title: string, description: string) {
  const user = await auth()
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    return null;
  }
  try {
    const result = await queries.createMyPost({
      title,
      description,
      creatorPageId
    })
    if(!result[0]) throw new Error("Failed to create post");
    const postId = result[0].id;
    return postId
  } catch (error) {
    return null
  }
}

export async function submitContentData(
  data :{
    key: string;
    type: string;
    name: string;
    size: string;
    usedIn: string;}[],
) {
  const user = await auth()
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    return null;
  }
  try {
    const contentIds = await Promise.all(
      data.map(async (content) => {
        const result = await queries.createMyContent({
          creatorPageId: creatorPageId,
          type: content.type,
          contentKey: content.key,
          fileName: content.name,
          size: content.size,
          usedIn: content.usedIn
        })
        if (!result[0]) throw new Error("Failed to create content");
        return result[0].id;
      })
    )
    return contentIds
  } catch (error) {
    return null
  }
}

export async function linkPostContent(
  postId: string,
  contentIds: string[]
) {
  try {
    const postContentIds = await Promise.all(
      contentIds.map(async (contentId) => {
        const result = await queries.createMyPostContent(postId, contentId)
        if (!result[0]) throw new Error("Failed to link post content");
        return result[0].id
      })
    )
    return postContentIds
  } catch (error) {
    return null
  }
}

export async function linkPostToMembership(data: {
  postId: string,
  membershipId: string,
}) {
  try {
    const membershipexclusiveId = 
      await queries.createMyMembershipExclusivePost(data)
    return membershipexclusiveId[0]?.id
  } catch (error) {
    return null
  }
}

export async function retrievePostInfo() {
  const user = await auth();
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) throw new Error("user is not authenticated");
  try {
    const postInfo = await queries.getMyPostInfo(creatorPageId)
    if (!postInfo) throw new Error("Failed to get post info");
    return postInfo
  }catch(error) {
    return null
  }
}

export async function contentUrl(key:string) {
  const appId = process.env.UPLOADTHING_APP_ID
  const contentUrl = `https://${appId}.ufs.sh/f/${key}`;
  return contentUrl
}

export async function authenticatePostEditForm(postId: string) {
  const user = await auth();
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    throw new Error("user is not authenticated")
  }

  const isOwner = await queries.checkPostOwnership(creatorPageId, postId)

  return isOwner
}

export async function retrievePostInfoById(postId : string) {
  const user = await auth();
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    throw new Error("user is not authenticated")
  }

  const isOwner = await queries.checkPostOwnership(creatorPageId, postId)

  if (!isOwner) {
    throw new Error("You don't have permission to access this post");
  }

  const postInfoById = await queries.getPostInfoById(postId)
  if (!postInfoById) throw new Error("Failed to get post info");

  return postInfoById
}

type UploadedFile = {
  key: string;
  name: string;
  size: number;
  type: string;
};

export async function updateFullPost(postId: string, data: {
  title?: string;
  description?: string;
  membershipsToAdd?: string[];
  membershipsToRemove?: string[];
  removeAllMemberships?: boolean;
  filesToAdd?: UploadedFile[];
  filesToRemove?: string[]
}) {
  const user = await auth();
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    throw new Error("user is not authenticated")
  }
  await queries.editPostTransaction(postId, creatorPageId, data)
}

export async function removePost(postId: string) {
  await queries.deletePost(postId)
}


export async function authenticateMembershipEditForm(membershipId: string) {
  const user = await auth();
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    throw new Error("user is not authenticated")
  }

  const isOwner = await queries.checkMembershipCreator(creatorPageId, membershipId)

  return isOwner
}

export async function retrieveMembershipInfoById(membershipId: string) {
  const user = await auth()
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    throw new Error("user is not authenticated")
  }

  const isOwner = await queries.checkMembershipCreator(creatorPageId, membershipId)

  if (!isOwner) {
    throw new Error("You don't have permission to access this post");
  }

  const membershipInfoById = await queries.getMembershipInfoById(membershipId)
  if (!membershipInfoById) throw new Error("Failed to get post info");

  return membershipInfoById
}

export async function updateMembershipTierInfo(id: string, data: {
  description: string;
  title: string;
  price: number;
}) {
  const user = await auth()
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    throw new Error("user is not authenticated")
  }
  
  await queries.editMembershipInfo(id, data)
}

export async function removeMembership(membershipId: string) {
  await queries.deleteMembership(membershipId)
}

export async function findCreators(
  search: string = "",
  page: number = 0,
  limit: number = 18
) {
  const { creators, total } = await queries.getCreators(search, page, limit);

  return { creators, total, limit }
}

export async function retrieveCreatorDataByHandle(pageHandle:string) {
  const user = await auth()
  const creatorPageId = user?.user.creatorPageId
  if (!creatorPageId) {
    throw new Error("user is not authenticated")
  }

  const creatorInfo = await queries.getCreatorDataByHandle(pageHandle)
  return creatorInfo
}

export async function retrievePostInfoByHandle(pageHandle:string) {
  const user = await auth();
  if (!user) throw new Error("user is not authenticated");
  
  const creatorPageId = await queries.getCreatorIdByHandle(pageHandle)
  const postInfo = await queries.getMyPostInfo(creatorPageId!)

  return postInfo
}

export async function retrieveMyMembershipTiersByHandle(pageHandle:string) {
  const user = await auth();
  if (!user) throw new Error("user is not authenticated");
  
  const creatorPageId = await queries.getCreatorIdByHandle(pageHandle)
  if (!creatorPageId) throw new Error("user is not authenticated");

  const postInfo = await queries.getMyMembershipTiers({ creatorPageId })

  return postInfo
}

export async function checkIfSelf(pageHandle:string) {
  const user = await auth();
  const userCreatorId: string | null =
    user?.user?.creatorPageId ?? null;
  const pageId: string | null = await queries.getCreatorIdByHandle(pageHandle);

  if (userCreatorId == pageId) {
    return true
  } else {
    return false
  }
}

type SubscribeResult =
  | { ok: true; message: string; until?: string }
  | { ok: false; message: string; until?: string };

export async function subscribeMembershipAction(input: {
  membershipId: string;
  pageHandle: string;
}): Promise<SubscribeResult> {
  const session = await auth();
  if (!session) return { ok: false, message: "Please sign in to subscribe." };

  try {
    // 1) If already active, tell them until when
    const active = await queries.getActiveMembershipPeriod(session.user.id, input.membershipId);
    if (active?.currentPeriodEnd) {
      return {
        ok: false,
        message: `You already have an active membership until ${active.currentPeriodEnd.toISOString()}.`,
        until: active.currentPeriodEnd.toISOString(),
      };
    }

    // 2) Create a new period row
    const priceString = await queries.getMembershipPriceString(input.membershipId);
    const res = await queries.createMembershipPeriod({
      userId: session.user.id,
      membershipId: input.membershipId,
      priceString,
    });

    return {
      ok: true,
      message: `Subscription started. Valid until ${res.end.toISOString()}.`,
      until: res.end.toISOString(),
    };
  } catch (err: any) {
    // Duplicate start (very rare) or other DB error
    const msg =
      err?.code === "23505"
        ? "Duplicate period detected. Please try again in a moment."
        : err?.message ?? "Failed to subscribe.";
    return { ok: false, message: msg };
  }
}

export async function retrieveViewerMembershipIdsForCreator(pageHandle:string) {
  const user = await auth();
  if (!user) throw new Error("user is not authenticated");

  const result = await queries.getViewerMembershipIdsForCreator(pageHandle, user.user.id)
  return result
}

export async function retrieveCreatorsWithUserMemberships() {
  const user = await auth();
  if (!user) throw new Error("user is not authenticated");

  const result = await queries.getCreatorsWithUserMemberships(user.user.id)
  return result
}