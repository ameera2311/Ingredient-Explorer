import React from "react";
import RecipeDetails from "../components/RecipeDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RecipePage({ recipe, onBack }) {
  return (
    <div className="min-h-screen bg-[#fdfcfb]">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <RecipeDetails recipe={recipe} onBack={onBack} />
      </main>
      <Footer />
    </div>
  );
}
