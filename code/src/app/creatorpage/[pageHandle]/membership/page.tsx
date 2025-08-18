import CreatorMembershipsView from "~/components/CreatorMembershipsView";
import { retrieveMyMembershipTiersByHandle } from "~/server/actions";


export default async function CreatorPublicPageMemberships({
  params,
}: {
  params: { pageHandle: string };
}) {
  const param = await params
  const membershipPlans = await retrieveMyMembershipTiersByHandle(param.pageHandle)

  return (
    <main className="p-6">
      <div className="w-1/2 mx-auto">
        <CreatorMembershipsView plans={membershipPlans} />
      </div>
    </main>
  );
}
