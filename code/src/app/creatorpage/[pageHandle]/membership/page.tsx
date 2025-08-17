import CreatorPageHeader from "~/components/CreatorPageHeader";
import { retrieveCreatorDataByHandle } from "~/server/actions";

export default async function CreatorPublicPageMemberships({
  params,
}: {
  params: { uniqueHandle: string };
}) {
  const param = await params

  return (
    <div className="">
      <p>Memberships</p>
    </div>
  );
}
