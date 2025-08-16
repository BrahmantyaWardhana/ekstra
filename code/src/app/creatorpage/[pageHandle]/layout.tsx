import CreatorDashboardHeader from "~/components/CreatorDashboardHeader";
import Sidebar from "~/components/Sidebar";
import { retrieveCreatorPageData } from "~/server/actions";
import { menuItems } from "~/components/UserMenuItems";
import AccountDropdown from "~/components/AccountDropdown";

export default async function creatorLayout({ children, }: { children: React.ReactNode; }) {

  const creatorData = await retrieveCreatorPageData();

  return(
    <>
      <div className="lg:ml-64">
        <Sidebar 
          menuItems={menuItems}
          accountDropdown={ <AccountDropdown />}
        />
        <CreatorDashboardHeader creatorData={creatorData} />
        {children}
      </div>
    </>
  )
}