'use client';

import { useState } from 'react';

export default function CreatorForm() {
  const [pageName, setPageName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageName.trim()) return;

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          id="pageName"
          name="pageName"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Your creator name"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!pageName.trim()}
        className={`w-full font-bold py-2 px-4 rounded-lg transition duration-200 ${
          pageName.trim()
            ? 'bg-white hover:bg-gray-300 text-black cursor-pointer'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </form>
  );
}
