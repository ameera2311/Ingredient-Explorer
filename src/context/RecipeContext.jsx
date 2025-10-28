import { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [timeFilter, setTimeFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Simulate random cook times (since API doesn’t provide it)
  const assignCookTimes = (recipes) => {
    return recipes.map((r) => ({
      ...r,
      cookTime: Math.floor(Math.random() * 90) + 10, // random 10–100 mins
    }));
  };

  // Fetch recipes by ingredient OR name
  const fetchRecipes = async (query = "chicken") => {
    try {
      setLoading(true);

      // Step 1: Try to search by recipe name
      let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      let data = await res.json();

      // Step 2: If no results found, try ingredient search
      if (!data.meals) {
        res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
        );
        data = await res.json();
      }

      const withTime = assignCookTimes(data.meals || []);
      setRecipes(withTime);
      applyFilters(withTime, timeFilter);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply time filters
  const applyFilters = (recipesList, filter) => {
    let filtered = [...recipesList];
    if (filter === "under30") filtered = filtered.filter((r) => r.cookTime <= 30);
    else if (filter === "30to60")
      filtered = filtered.filter((r) => r.cookTime > 30 && r.cookTime <= 60);
    else if (filter === "above60")
      filtered = filtered.filter((r) => r.cookTime > 60);
    setFilteredRecipes(filtered);
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) fetchRecipes(searchQuery.trim());
  };

  // Reapply filters when timeFilter changes
  useEffect(() => {
    applyFilters(recipes, timeFilter);
  }, [timeFilter]);

  // Default load
  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        handleSearch,
        recipes: filteredRecipes,
        loading,
        fetchRecipes,
        timeFilter,
        setTimeFilter,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
