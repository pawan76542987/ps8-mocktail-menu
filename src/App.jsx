import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Drinks from "./pages/Drinks";
import DrinkDetails from "./pages/DrinkDetails";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";

const STORAGE_KEY = "mocktail_favourites";

function App() {
  // Read saved favourites from localStorage when the app first loads
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Automatically save to localStorage whenever favourites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      // Storage might fail in restricted browser environments; fail gracefully
    }
  }, [favourites]);

  // Add or remove a drink from the favourites list
  function toggleFavourite(drink) {
    if (!drink || !drink.idDrink) return;

    setFavourites((previous) => {
      const alreadyAdded = previous.some(
        (item) => item.idDrink === drink.idDrink
      );

      if (alreadyAdded) {
        return previous.filter((item) => item.idDrink !== drink.idDrink);
      }

      return [...previous, drink];
    });
  }

  return (
    <BrowserRouter>
      <Navbar favouriteCount={favourites.length} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/drinks"
          element={
            <Drinks
              favourites={favourites}
              toggleFavourite={toggleFavourite}
            />
          }
        />

        <Route
          path="/drinks/:id"
          element={
            <DrinkDetails
              favourites={favourites}
              toggleFavourite={toggleFavourite}
            />
          }
        />

        <Route
          path="/favourites"
          element={
            <Favourites
              favourites={favourites}
              toggleFavourite={toggleFavourite}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;