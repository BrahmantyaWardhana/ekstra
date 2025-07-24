'use server';

import { auth } from '~/server/auth';
import * as queries from '~/server/queries';
import { utapi } from './uploadthing';

export async function checkHandleUnique(handle: string) {
  try{
    return await queries.isHandleAvailable(handle); // returns true if taken
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
  const userImage = user?.user?.image ?? null;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    await queries.createCreatorPage({
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

export async function addContentToDatabase() {
}