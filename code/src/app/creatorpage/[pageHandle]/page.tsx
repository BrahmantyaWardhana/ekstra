import { redirect } from 'next/navigation'
import React from 'react'

export default async function CreatorPageView({
  params,
}:{
  params: {pageHandle : string}
}) {

  const param = await params
  return(
    <div>
    
    </div>
  )
}