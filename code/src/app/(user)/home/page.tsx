import Sidebar from "~/components/SidebarHome";

export default async function AppHome() {
  return (
    <>
      <div className="lg:ml-64">
        <Sidebar />
        <main className="p-6">
          <p>App Home Page</p>
        </main>
      </div>
    </>
  );
}
