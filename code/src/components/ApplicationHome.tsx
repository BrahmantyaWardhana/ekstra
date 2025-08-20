"use client";

import Link from "next/link";

type ActiveMembershipsProps = {
  creators: {
    id: string;
    name: string;
    pageHandle: string;
    img: string;
    description: string | null;
    memberships: { id: string; title: string; price: string }[];
  }[];
};

export default function ApplicationHome({ creators }: ActiveMembershipsProps) {
  return (
    <div className="text-white space-y-6">
      <h2 className="text-lg font-semibold mb-6">Active Memberships</h2>

      {creators.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-sm text-gray-400">
            You don’t have any active memberships yet.
          </p>
          <Link
            href="/user/explore"
            className="px-4 py-2 text-sm bg-white text-black rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            Explore Creators
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {creators.map((creator) => (
            <Link
              key={creator.id}
              href={`/creatorpage/${creator.pageHandle}`}
              className="bg-neutral-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-neutral-600 transition"
            >
              <div className="h-40 bg-neutral-700">
                <img
                  src={creator.img}
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold">{creator.name}</h3>
                {creator.description ? (
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {creator.description}
                  </p>
                ) : null}
                {creator.memberships.length > 0 ? (
                  <p className="mt-2 text-xs text-gray-300">
                    You own:{" "}
                    {creator.memberships.map((m) => m.title).join(", ")}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
