import CreatorAccountDropdown from "~/components/CreatorAccountDropdown";
import { menuItems } from "~/components/CreatorMenuItems";
import Sidebar from "~/components/Sidebar";

export default function creatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return(
    <>
      <div className="lg:ml-64">
        <Sidebar 
          menuItems={menuItems}
          accountDropdown={ <CreatorAccountDropdown />}
        />
        {children}
      </div>
    </>
  )
}