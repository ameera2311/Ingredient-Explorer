import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecipeProvider } from "./context/RecipeContext";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <RecipeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </RecipeProvider>
  );
}

export default App;
