import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.idMeal}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{recipe.strMeal}</h3>
        </div>
      </div>
    </Link>
  );
}
