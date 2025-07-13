// ~/server/actions.ts
'use server';

import { createCreatorPage } from '~/server/queries';

export async function submitCreatorPage(data: { 
  name: string; 
  handle: string; 
  description: string 
}) {
  return await createCreatorPage(data);
}