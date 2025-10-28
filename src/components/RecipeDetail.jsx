import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data.meals[0]));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded-xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
      <p className="mb-4 text-gray-600">{recipe.strArea} | {recipe.strCategory}</p>

      <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
      <ul className="list-disc list-inside mt-2">
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          return ingredient ? <li key={i}>{ingredient} - {measure}</li> : null;
        })}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Instructions</h2>
      <p className="mt-2 text-gray-700">{recipe.strInstructions}</p>
    </div>
  );
}
