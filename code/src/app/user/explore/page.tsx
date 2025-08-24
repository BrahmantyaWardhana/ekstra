import ExploreCreators from "~/components/ExploreCreators";
import { findCreators } from "~/server/actions";
export const dynamic = 'force-dynamic';

export default async function AppHome() {
  const { creators, total, limit } = await findCreators()

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
