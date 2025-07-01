export default function SearchBar() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <input
        type="search"
        placeholder="Search"
        aria-label="Search"
        className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-white-500
                   focus:border-transparent transition-all duration-200"
      />
      
      {/* Search Icon Button */}
      <button
        type="submit"
        aria-label="Submit search"
        className="absolute right-0 top-0 h-full px-3 flex items-center 
                   justify-center text-gray-500 hover:text-white-600 
                   focus:outline-none"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
