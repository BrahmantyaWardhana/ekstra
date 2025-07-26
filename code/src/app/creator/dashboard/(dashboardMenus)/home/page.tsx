import CreatorHome from "~/components/CreatorHome";
import { retrievePostInfo } from "~/server/actions";

const creatorPostInfo = await retrievePostInfo()

export default function CreatorDashboardHome() {
  return (
    <main className="p-6">
      <div className="w-1/2 mx-auto">
        <CreatorHome posts={creatorPostInfo} />
      </div>
    </main>  
  )
}