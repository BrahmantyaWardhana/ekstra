import Sidebar from "~/components/Sidebar";
import { menuItems } from "~/components/UserMenuItems";
import AccountDropdown from "~/components/AccountDropdown";
import { getCreatorHeader } from "~/server/queries";
import CreatorPageHeader from "~/components/CreatorPageHeader";
import { notFound } from "next/navigation";

type CreatorPageData = {
  name: string;
  profileImage: string | null;
  description: string | null;
  pageHandle: string;
};

export default async function creatorLayout({ children, params }: any) {
  const param = await params
  const header =  await getCreatorHeader(param.pageHandle);
  if (!header) return notFound();

  const creatorData: CreatorPageData[] = [
    {
      name: header.name ?? "Creator",
      profileImage: header.profileImage ?? null,
      description: header.description ?? null,
      pageHandle: header.pageHandle,
    },
  ];

  return(
    <>
      <div className="lg:ml-64">
        <Sidebar 
          menuItems={menuItems}
          accountDropdown={ <AccountDropdown />}
        />
        <CreatorPageHeader creatorData={creatorData} />
        {children}
      </div>
    </>
  )
}