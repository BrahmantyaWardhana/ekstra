import { CreatorPageTabs } from "~/components/CreatorPageTabs";
import { getCreatorPageInfoByHandle } from "~/server/queries";

export default async function CreatorPageView({
  params,
}: {
  params: { pageHandle: string };
}) {

  const param = await params
  const creatorPage = await getCreatorPageInfoByHandle(param.pageHandle);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <CreatorPageTabs creator={creatorPage} />
    </div>
  );
}
