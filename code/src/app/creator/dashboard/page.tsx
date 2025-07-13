import Sidebar from "~/components/Sidebar";
import { menuItems } from "~/components/CreatorMenuItems";

export default function Dashboard() {
  return (
    <>
      <div className="lg:ml-64">
        <Sidebar menuItems={menuItems} />
        <main className="p-6">
          <p>App Home Page</p>
        </main>
      </div>
    </>
  )
}