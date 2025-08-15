"use client";

import { useState } from "react";

export default function ApplicationHome() {
  const creators = [
    { name: "Heatah And Hustla Reacts", desc: "Creating Reactions, AMV's", img: "/creator1.jpg" },
    { name: "Kirax", desc: "Creating Skyrim Modding", img: "/creator2.jpg" },
    { name: "NOT SO DAILY", desc: "Creating Reaction Videos", img: "/creator3.jpg" },
    { name: "SUKI", desc: "Asylum Modlist", img: "/creator4.jpg" },
    { name: "Sour Taste", desc: "Creating Early Access", img: "/creator5.jpg" },
    { name: "Duo Reacts", desc: "Creating YouTube Videos", img: "/creator6.jpg" },
    { name: "Extra Creator 1", desc: "Something cool", img: "/creator7.jpg" },
    { name: "Extra Creator 2", desc: "Something cool", img: "/creator8.jpg" },
    { name: "Extra Creator 3", desc: "Something cool", img: "/creator9.jpg" },
    { name: "Extra Creator 4", desc: "Something cool", img: "/creator10.jpg" },
    { name: "Extra Creator 5", desc: "Something cool", img: "/creator11.jpg" },
    { name: "Extra Creator 6", desc: "Something cool", img: "/creator12.jpg" },
  ];

  const itemsPerPage = 12;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(creators.length / itemsPerPage);
  const start = page * itemsPerPage;
  const currentItems = creators.slice(start, start + itemsPerPage);

  return (
    <div className="text-white space-y-6">
      {/* Search */}
      <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
        <input
          type="text"
          placeholder="Search creators or topics"
          className="bg-transparent outline-none px-2 w-full text-sm"
        />
      </div>

      {/* Creators */}
      <section>
        <h2 className="text-lg font-semibold mb-6">Ekstra Creators</h2>
        <div className="grid grid-cols-4 gap-8">
          {currentItems.map((creator) => (
            <div
              key={creator.name}
              className="bg-neutral-800 rounded-lg overflow-hidden"
            >
              <div className="h-28 bg-neutral-700">
                <img
                  src={creator.img}
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold">{creator.name}</h3>
                <p className="text-xs text-gray-400">{creator.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 rounded bg-neutral-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1 rounded bg-neutral-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
