"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function CreatorPageTabs({ creator }: { creator: any }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab") ?? "posts";

  const changeTab = (t: string) => {
    router.push(`/creator/${creator.pageHandle}?tab=${t}`);
  };

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">{creator.name}</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {["posts", "memberships", "about"].map((t) => (
          <button
            key={t}
            onClick={() => changeTab(t)}
            className={`pb-2 ${
              tab === t ? "border-b-2 border-black font-semibold" : "text-gray-500"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "posts" && (
        <div>
          <h2 className="text-xl mb-2">Posts</h2>
          {/* Render posts here */}
        </div>
      )}
      {tab === "memberships" && (
        <div>
          <h2 className="text-xl mb-2">Memberships</h2>
          {/* Render memberships here */}
        </div>
      )}
      {tab === "about" && (
        <div>
          <h2 className="text-xl mb-2">About</h2>
          <p>{creator.bio}</p>
        </div>
      )}
    </div>
  );
}
