import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {recipes.map((r) => <RecipeCard key={r.idMeal} recipe={r} />)}
    </div>
  );
}
