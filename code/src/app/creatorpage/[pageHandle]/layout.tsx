import Sidebar from "~/components/Sidebar";
import { menuItems } from "~/components/UserMenuItems";
import AccountDropdown from "~/components/AccountDropdown";

export default async function creatorLayout({ children, }: { children: React.ReactNode; }) {

  return(
    <>
      <div className="lg:ml-64">
        <Sidebar 
          menuItems={menuItems}
          accountDropdown={ <AccountDropdown />}
        />
        {children}
      </div>
    </>
  )
}