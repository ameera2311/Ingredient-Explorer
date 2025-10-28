import { useEffect, useState } from "react";

export default function CategoryList({ onSelect = () => {} }) {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        const data = await res.json();
        // Limit to first 20 ingredients for cleaner UI
        setIngredients(data.meals.slice(0, 20) || []);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  if (loading) return <p className="text-center py-4">Loading ingredients...</p>;

  return (
    <div className="flex flex-wrap gap-3 justify-center py-4">
      {ingredients.map((ingredient) => (
        <button
          key={ingredient.idIngredient}
          onClick={() => onSelect(ingredient.strIngredient)} // ✅ triggers parent handler
          className="px-4 py-2 bg-gray-100 rounded-lg shadow-sm hover:bg-yellow-400 hover:text-white transition font-medium"
        >
          {ingredient.strIngredient}
        </button>
      ))}
    </div>
  );
}
