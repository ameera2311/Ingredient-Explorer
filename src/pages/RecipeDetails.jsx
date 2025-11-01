import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, ChefHat, Star } from "lucide-react";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals[0]));
  }, [id]);

  if (!recipe)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading recipe details...
      </div>
    );

  //
  const getIngredientCount = (recipe) => {
    return Object.keys(recipe).filter(
      (key) => key.startsWith("strIngredient") && recipe[key]
    ).length;
  };

  const ingredientCount = getIngredientCount(recipe);

  const getCookingTime = (count) => {
    if (count <= 5) return "Under 20 mins";
    if (count <= 10) return "20–40 mins";
    if (count <= 15) return "40–60 mins";
    return "Above 60 mins";
  };

  const getDifficulty = (count) => {
    if (count <= 5) return "Easy";
    if (count <= 10) return "Medium";
    return "Hard";
  };

  const cookingTime = getCookingTime(ingredientCount);
  const difficulty = getDifficulty(ingredientCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white-50 to-white p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden p-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-orange-600 mb-1">
              {recipe.strMeal}
            </h1>
            <p className="text-gray-500">
              {recipe.strArea} • {recipe.strCategory}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 mt-6">
            <div className="flex items-center gap-3 bg-white border border-orange-100 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock size={18} className="text-orange-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-500">Time</span>
                <span className="text-sm font-semibold text-gray-800">
                  {cookingTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-green-100 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="bg-green-100 p-2 rounded-lg">
                <ChefHat size={18} className="text-green-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-500">Level</span>
                <span className="text-sm font-semibold text-gray-800">
                  {difficulty}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-yellow-100 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Star size={18} className="text-yellow-500 fill-yellow-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-500">Rating</span>
                <span className="text-sm font-semibold text-gray-800">
                  4.5 / 5
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full max-w-md h-80 object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-orange-700 mb-3">
              Ingredients
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];
                return ingredient ? (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-white border border-orange-100 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition"
                  >
                    <span className="font-medium text-orange-600">
                      {ingredient}
                    </span>
                    <span className="text-sm text-gray-500">– {measure}</span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl mt-8 p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-orange-700 mb-3">
            Instructions
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {recipe.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
}
