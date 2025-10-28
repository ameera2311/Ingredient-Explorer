import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import CategoryList from "../components/CategoryList";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const { fetchRecipes, recipes, loading } = useContext(RecipeContext);

  const handleIngredientSelect = (ingredient) => {
    fetchRecipes(ingredient); // ✅ fetch recipes by ingredient
  };

  return (
    <div>
      <CategoryList onSelect={handleIngredientSelect} />

      {loading ? (
        <p className="text-center mt-10">Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="text-center mt-10">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
