import { redirect } from 'next/navigation'
import React from 'react'
import CreatorEditPostForm from '~/components/CreatorEditPostForm'
import { authenticatePostEditForm, retrieveMembershipNames, retrievePostInfoById } from '~/server/actions'

export default async function EditPost({
  params,
}:{
  params: {postId : string}
}) {

  const param = await params
  const isOwner = await authenticatePostEditForm(param.postId);

  if (!isOwner) {
    redirect("/creator/dashboard");
  }
  const membership = await retrieveMembershipNames()
  const postInfo = await retrievePostInfoById(param.postId)

  return (
    <main className="m-10">    
      <div className="w-2/3 mx-auto">
        <CreatorEditPostForm 
          postInfo={postInfo} 
          memberships={membership || []} 
        />
      </div>
    </main>
  )
}
