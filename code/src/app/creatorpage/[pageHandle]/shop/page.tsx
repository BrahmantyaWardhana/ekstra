import CreatorShopView from "~/components/CreatorShopView";

export default async function CreatorPublicPageShop({
  params,
}: {
  params: { uniqueHandle: string };
}) {
  const param = await params

  return (
    <main className="p-6">
      <div className="w-1/2 mx-auto">
        <CreatorShopView />
      </div>
    </main>
  );
}
