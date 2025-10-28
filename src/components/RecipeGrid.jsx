import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeGrid = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No recipes found. Try searching for another ingredient.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4 max-w-6xl mx-auto">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
