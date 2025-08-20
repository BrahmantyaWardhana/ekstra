import ApplicationHome from "~/components/ApplicationHome";
import { retrieveCreatorsWithUserMemberships } from "~/server/actions";

export default async function AppHome() {
  const creators = await retrieveCreatorsWithUserMemberships();

  return (
    <>
      <main className="p-8">
        <ApplicationHome creators={creators} />
      </main>
    </>
  );
}