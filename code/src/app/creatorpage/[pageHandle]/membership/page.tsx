import { getMembershipsByHandle } from "~/server/queries";
import CreatorMembershipsView from "~/components/CreatorMembershipsView";

export default async function MembershipPage({
  params,
}: { params: { pageHandle: string } }) {
  const param = await params
  const plans = await getMembershipsByHandle(param.pageHandle);

  return (
    <main className="p-6">
      <div className="w-1/2 mx-auto">
        <CreatorMembershipsView plans={plans} pageHandle={param.pageHandle}/>
      </div>
    </main>
  );
}
