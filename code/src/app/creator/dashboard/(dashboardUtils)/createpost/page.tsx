import CreatePostForm from "~/components/CreatePostForm";
import { retrieveMembershipNames } from "~/server/actions";

const membership = await retrieveMembershipNames()

export default function CreatePost() {
  return (
    <main className="m-10">    
      <div className="w-2/3 mx-auto">
        <CreatePostForm memberships={membership || []} />
      </div>
    </main>
  )
}