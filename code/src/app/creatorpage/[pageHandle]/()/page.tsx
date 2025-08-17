import CreatorPostsView from "~/components/CreatorPostsView";
import { retrievePostInfoByHandle } from "~/server/actions";

export default async function CreatorPublicPageHome({
  params,
}: {
  params: { pageHandle: string };
}) {
  const param = await params
  const creatorPostInfo = await retrievePostInfoByHandle(param.pageHandle)

  return (
    <main className="p-6">
      <div className="w-1/2 mx-auto">
        <CreatorPostsView posts={creatorPostInfo} />
      </div>
    </main>
  );
}
