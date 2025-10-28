import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { Clock } from "lucide-react";


export default function Navbar() {
  const {
    searchQuery,
    setSearchQuery,
    handleSearch,
    timeFilter,
    setTimeFilter,
  } = useContext(RecipeContext);

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-md gap-4">
      {/* 🍽️ Website Title */}
      <h1 className="text-2xl font-bold text-orange-600 tracking-normal font-poppins w-full sm:w-auto text-center sm:text-left">
       Ingredient Explorer
      </h1>

      {/* 🔍 Search Form */}
      <div className="w-full sm:w-auto flex justify-center flex-grow">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full sm:w-[800px] justify-center"
        >
          <input
            type="text"
            placeholder="Search by ingredient or recipe..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="ml-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* ⏱️ Time Filter Dropdown */}
     <div className="ml-auto sm:ml-0 w-full sm:w-auto flex justify-end">
  <div className="relative w-full sm:w-48">
    {/* Icon */}
    <Clock
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
    />

    {/* Select Dropdown */}
    <select
      value={timeFilter}
      onChange={(e) => setTimeFilter(e.target.value)}
      className="appearance-none w-full bg-white text-gray-800 border border-orange-200 rounded-xl pl-10 pr-8 py-2.5 text-sm shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-300
                 transition-all duration-200 cursor-pointer font-medium"
    >
      <option value="all">All Times</option>
      <option value="under30">Under 30 mins</option>
      <option value="30to60">30–60 mins</option>
      <option value="above60">Above 60 mins</option>
    </select>

    {/* Custom arrow */}
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

    </nav>
  );
}
