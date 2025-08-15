import ExploreCreators from "~/components/ExploreCreators";
import { getCreators } from "~/server/queries";

export default async function AppHome() {
  const limit = 12;
  const { creators, total } = await getCreators("", 0, limit);

  return (
    <main className="p-8">
      <ExploreCreators
        initialCreators={creators}
        initialTotal={total}
        limit={limit}
      />
    </main>
  );
}
