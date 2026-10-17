import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Drinks from "./pages/Drinks";
import DrinkDetails from "./pages/DrinkDetails";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";

function App() {
  const [favourites, setFavourites] = useState([]);

  function toggleFavourite(drink) {
    setFavourites((previous) => {
      const alreadyAdded = previous.some(
        (item) => item.idDrink === drink.idDrink
      );

      if (alreadyAdded) {
        return previous.filter(
          (item) => item.idDrink !== drink.idDrink
        );
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
          element={<DrinkDetails />}
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