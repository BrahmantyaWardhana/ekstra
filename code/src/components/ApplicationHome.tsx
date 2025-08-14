"use client";

import { useState } from "react";

export default function ApplicationHome() {
  const creatorsForYou = [
    { name: "Heatah And Hustla Reacts", desc: "Creating Reactions, AMV's", img: "/creator1.jpg" },
    { name: "Kirax", desc: "Creating Skyrim Modding", img: "/creator2.jpg" },
    { name: "NOT SO DAILY", desc: "Creating Reaction Videos", img: "/creator3.jpg" },
    { name: "SUKI", desc: "Asylum Modlist", img: "/creator4.jpg" },
    { name: "Sour Taste", desc: "Creating Early Access", img: "/creator5.jpg" },
    { name: "Duo Reacts", desc: "Creating YouTube Videos", img: "/creator6.jpg" },
  ];

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

      {/* Creators for you */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Ekstra Creators</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {creatorsForYou.map((creator) => (
            <div
              key={creator.name}
              className="bg-neutral-800 rounded-lg overflow-hidden min-w-[180px] max-w-[180px] flex-shrink-0"
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
      </section>
    </div>
  );
}
