'use server';

import { auth } from '~/server/auth';
import { createCreatorPage } from '~/server/queries';

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
    // Or redirect to login: redirect('/login');
  }

  try {
    await createCreatorPage({
      ...data,
      userId,
      userImage,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create creator page' };
  }
}