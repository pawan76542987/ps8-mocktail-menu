import { useEffect, useState } from "react";
import DrinkCard from "../components/DrinkCard";

// Free, public API endpoint for non-alcoholic drinks
const API_URL =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";

function Drinks({ favourites = [], toggleFavourite }) {
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Fetch drinks on mount or when user clicks Try Again
  useEffect(() => {
    let isMounted = true;

    async function fetchDrinks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch drinks (HTTP status: ${response.status})`
          );
        }

        const data = await response.json();
        if (isMounted) {
          setDrinks(data.drinks || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.message || "Could not load drinks. Please check your connection."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDrinks();

    return () => {
      isMounted = false;
    };
  }, [reloadTrigger]);

  // Filter drinks by search term (case-insensitive and trimmed)
  const trimmedSearch = search.trim().toLowerCase();
  const filteredDrinks = drinks.filter((drink) =>
    drink.strDrink.toLowerCase().includes(trimmedSearch)
  );

  // Loading state (wrapped in page-container to avoid layout jumps)
  if (loading) {
    return (
      <main className="page-container">
        <div className="message-box">
          <div className="spinner" aria-hidden="true"></div>
          <p className="message">Loading refreshing mocktails...</p>
        </div>
      </main>
    );
  }

  // Error state with React-based retry (no full page reload needed)
  if (error) {
    return (
      <main className="page-container">
        <div className="message-box">
          <p className="message error-message">{error}</p>
          <button
            type="button"
            className="primary-button"
            onClick={() => setReloadTrigger((prev) => prev + 1)}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="section-heading">
        <p className="eyebrow">OUR COLLECTION</p>
        <h1>Explore Mocktails</h1>
        <p>Find a refreshing drink for every mood.</p>
      </div>

      <div className="search-bar-wrapper">
        <input
          type="search"
          className="search-input"
          placeholder="Search drinks by name (e.g. Lime, Apple)..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search drinks by name"
        />
        {search && (
          <button
            type="button"
            className="clear-search-button"
            onClick={() => setSearch("")}
            aria-label="Clear search text"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {filteredDrinks.length === 0 ? (
        <div className="message-box">
          <p className="message">
            No drinks found matching &ldquo;{search}&rdquo;.
          </p>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setSearch("")}
          >
            Show All Drinks
          </button>
        </div>
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