import { useEffect, useState } from "react";
import DrinkCard from "../components/DrinkCard";

const API_URL =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";

function Drinks({ favourites, toggleFavourite }) {
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getDrinks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Could not load drinks.");
        }

        const data = await response.json();
        setDrinks(data.drinks || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getDrinks();
  }, []);

  const filteredDrinks = drinks.filter((drink) =>
    drink.strDrink.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="message">Loading mocktails...</p>;
  }

  if (error) {
    return (
      <div className="message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="page-container">
      <div className="section-heading">
        <p className="eyebrow">OUR COLLECTION</p>
        <h1>Explore Mocktails</h1>
        <p>Find a refreshing drink for every mood.</p>
      </div>

      <input
        type="search"
        className="search-input"
        placeholder="Search drinks by name..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {filteredDrinks.length === 0 ? (
        <p className="message">No drinks found.</p>
      ) : (
        <div className="drink-grid">
          {filteredDrinks.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
              isFavourite={favourites.some(
                (item) => item.idDrink === drink.idDrink
              )}
              toggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Drinks;