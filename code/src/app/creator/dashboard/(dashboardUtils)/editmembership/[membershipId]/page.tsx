import React from 'react'
import CreatorEditMembershipForm from '~/components/CreatorEditMembershipForm'
import { retrieveMembershipInfoById } from '~/server/actions'

export default async function EditMembership({
  params,
}:{
  params: {membershipId : string}
}) {

  const param = await params
  const membershipInfo = await retrieveMembershipInfoById(param.membershipId)

  return (
    <main className="m-10">    
      <div className="w-2/3 mx-auto">
        <CreatorEditMembershipForm 
          plans={membershipInfo}
        />
      </div>
    </main>
  )
}
