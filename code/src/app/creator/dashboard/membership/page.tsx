import CreatorMemberships from "~/components/CreatorMemberships";
import { plans } from "~/components/dummyData/membershipData"


export default function CreatorDashboardMembership() {
  return (
    <main className="p-6">
      <div className="w-1/2 mx-auto">
        <CreatorMemberships plans={plans} />
      </div>
    </main>  
  )
}