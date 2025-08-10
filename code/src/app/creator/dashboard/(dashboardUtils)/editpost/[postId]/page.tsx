import React from 'react'
import CreatorEditPostForm from '~/components/CreatorEditPostForm'
import { retrieveMembershipNames, retrievePostInfoById } from '~/server/actions'

export default async function EditPost({
  params,
}:{
  params: {postId : string}
}) {

  const membership = await retrieveMembershipNames()
  const postInfo = await retrievePostInfoById(params.postId)

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
