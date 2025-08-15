import { redirect } from 'next/navigation'
import React from 'react'
import CreatorEditMembershipForm from '~/components/CreatorEditMembershipForm'
import { authenticateMembershipEditForm, retrieveMembershipInfoById } from '~/server/actions'

export default async function EditMembership({
  params,
}:{
  params: {membershipId : string}
}) {

  const param = await params
  const isOwner = await authenticateMembershipEditForm(param.membershipId);

  if (!isOwner) {
    redirect("/creator/dashboard");
  }

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
