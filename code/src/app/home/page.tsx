import Sidebar from "~/components/SIdebarHome";

export default async function AppHome() {

  return(
    <>
      <div className="lg:ml-64">
        <Sidebar />
        <main className="p-4">
          <p>App Home Page</p>
        </main>
      </div>
    </>
  )
}