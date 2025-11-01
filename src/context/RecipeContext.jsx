import { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

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

      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) fetchRecipes(searchQuery.trim());
  };

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
        recipes,
        loading,
        fetchRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
