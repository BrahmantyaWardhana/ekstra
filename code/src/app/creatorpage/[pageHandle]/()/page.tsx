import { redirect } from "next/navigation";
import CreatorPostsView from "~/components/CreatorPostsView";
import { checkIfSelf, retrievePostInfoByHandle, retrieveViewerMembershipIdsForCreator } from "~/server/actions";

export default async function CreatorPublicPageHome({
  params,
}: {
  params: { pageHandle: string };
}) {
  const param = await params

  const isSelf = await checkIfSelf(param.pageHandle)
  const viewerMembershipIds = await retrieveViewerMembershipIdsForCreator(param.pageHandle)

  if (isSelf) {
    redirect("/creator/dashboard");
  }

  const creatorPostInfo = await retrievePostInfoByHandle(param.pageHandle)

  return (
    <main className="p-6">
      <div className="w-1/2 mx-auto">
        <CreatorPostsView posts={creatorPostInfo} viewerMembershipIds={viewerMembershipIds} pageHandle={param.pageHandle} />
      </div>
    </main>
  );
}
