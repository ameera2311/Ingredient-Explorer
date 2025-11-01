import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

export default function Navbar() {
  const { searchQuery, setSearchQuery, handleSearch } =
    useContext(RecipeContext);

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-md gap-4">
      <h1 className="text-2xl font-bold text-orange-600 tracking-normal font-poppins w-full sm:w-auto text-center sm:text-left">
        Ingredient Explorer
      </h1>

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
    </nav>
  );
}
