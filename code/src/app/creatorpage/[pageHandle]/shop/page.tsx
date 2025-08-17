// app/creatorpage/[uniqueHandle]/page.tsx
import CreatorPageHeader from "~/components/CreatorPageHeader";
import { retrieveCreatorDataByHandle } from "~/server/actions";

export default async function CreatorPublicPageShop({
  params,
}: {
  params: { uniqueHandle: string };
}) {
  const param = await params

  return (
    <div className="">
      <p>Shop</p>
    </div>
  );
}
