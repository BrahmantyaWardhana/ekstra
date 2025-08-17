// app/creatorpage/[uniqueHandle]/page.tsx
import { getCreatorPageInfoByHandle } from "~/server/queries";
import CreatorPageHeader from "~/components/CreatorPageHeader";

export default async function CreatorPublicPage({
  params,
}: {
  params: { uniqueHandle: string };
}) {
  const creator = await getCreatorPageInfoByHandle(params.uniqueHandle);


  const displayName = creator?.name ?? "Creator";
  const handle = creator?.pageHandle ?? params.uniqueHandle;
  const avatarUrl = creator?.profileImage || "";
  const bio = creator?.description || null;

  const creatorData = [
    {
      name: displayName,
      profileImage: avatarUrl,
      description: bio,
      pageHandle: handle,
    },
  ];  

  return (
    <div className="">
      <CreatorPageHeader creatorData={creatorData} />
    </div>
  );
}
