// app/creatorpage/[uniqueHandle]/page.tsx
import CreatorPageHeader from "~/components/CreatorPageHeader";
import { retrieveCreatorDataByHandle } from "~/server/actions";

export default async function CreatorPublicPage({
  params,
}: {
  params: { uniqueHandle: string };
}) {
  const param = params
  const creatorId = await retrieveCreatorDataByHandle(params.uniqueHandle)

  return (
    <div className="">
      <p>Test</p>
    </div>
  );
}
