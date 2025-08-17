"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { findCreators } from "~/server/actions";

interface Creator {
  id: string;
  name: string;
  description: string | null;
  pageHandle: string;
  img: string;
}

interface ExploreCreatorsProps {
  initialCreators: Creator[];
  initialTotal: number;
  limit: number;
}

export default function ExploreCreators({
  initialCreators,
  initialTotal,
  limit,
}: ExploreCreatorsProps) {
  const [creators, setCreators] = useState(initialCreators);
  const [total, setTotal] = useState(initialTotal);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [isPending, startTransition] = useTransition();

  async function loadData(newSearch = search, newPage = page) {
    startTransition(async () => {
      const { creators, total } = await findCreators(newSearch, newPage, limit);
      setCreators(creators);
      setTotal(total);
      setPage(newPage);
    });
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
    setSearch(term);
    loadData(term, 0);
  }

  return (
    <div className="text-white space-y-6">
      {/* Search */}
      <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search creators..."
          value={search}
          onChange={handleSearchChange}
          className="bg-transparent outline-none px-2 w-full text-sm"
        />
      </div>

      {isPending && <p className="text-gray-400 text-sm">Loading...</p>}

      {/* Creators */}
      <h2 className="text-lg font-semibold mb-6">Ekstra Creators</h2>
      <div className="grid grid-cols-6 gap-8">
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
              <p className="text-xs text-gray-400">{creator.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => loadData(search, page - 1)}
          disabled={page === 0 || isPending}
          className="px-3 py-1 rounded bg-neutral-700 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page + 1} of {Math.ceil(total / limit)}
        </span>
        <button
          onClick={() => loadData(search, page + 1)}
          disabled={page >= Math.ceil(total / limit) - 1 || isPending}
          className="px-3 py-1 rounded bg-neutral-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
