import AccountDropdown from "~/components/AccountDropdown";
import Sidebar from "~/components/Sidebar";
import { menuItems } from "~/components/UserMenuItems";

export default async function AppHome() {
  return (
    <>
      <div className="lg:ml-64">
        <Sidebar 
          menuItems= {menuItems} 
          accountDropdown={<AccountDropdown />} 
        />
        <main className="p-6">
          <p>App Home Page</p>
        </main>
      </div>
    </>
  );
}
