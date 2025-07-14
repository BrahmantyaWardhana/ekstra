import Sidebar from "~/components/Sidebar";
import { menuItems } from "~/components/CreatorMenuItems";
import CreatorAccountDropdown from "~/components/CreatorAccountDropdown";

export default function Dashboard() {
  return (
    <>
      <div className="lg:ml-64">
        <Sidebar 
          menuItems={menuItems}
          accountDropdown={ <CreatorAccountDropdown />}
        />
        <main className="p-6">
          <p>Creator Dashboard Page</p>
        </main>
      </div>
    </>
  )
}