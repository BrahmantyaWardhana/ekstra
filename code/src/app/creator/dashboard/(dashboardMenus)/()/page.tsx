import CreatorHome from "~/components/CreatorHome";
import { retrievePostInfo } from "~/server/actions";

export default async function CreatorDashboardHome() {
  const creatorPostInfo = await retrievePostInfo()
  
  return (
    <main className="p-6">
      <div className="w-1/2 mx-auto">
        <CreatorHome posts={creatorPostInfo} />
      </div>
    </main>  
  )
}