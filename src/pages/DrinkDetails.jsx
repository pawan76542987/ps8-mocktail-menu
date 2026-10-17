import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function DrinkDetails({ favourites = [], toggleFavourite }) {
  // Read the dynamic ':id' route parameter from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch single drink recipe details by ID
  useEffect(() => {
    let isMounted = true;

    async function getDrink() {
      try {
        setLoading(true);
        setError("");
        setDrink(null);

        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
            id
          )}`
        );

        if (!response.ok) {
          throw new Error(`Failed to load recipe (HTTP status: ${response.status})`);
        }

        const data = await response.json();

        // TheCocktailDB returns { drinks: null } for invalid IDs
        if (!data.drinks || !data.drinks.length) {
          throw new Error("Drink recipe not found. The ID may be invalid.");
        }

        if (isMounted) {
          setDrink(data.drinks[0]);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Could not load the recipe details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getDrink();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Check if current drink is in favourites
  const isFavourite = Boolean(
    drink && favourites.some((item) => item.idDrink === drink.idDrink)
  );

  // Loading state
  if (loading) {
    return (
      <main className="page-container">
        <div className="message-box">
          <div className="spinner" aria-hidden="true"></div>
          <p className="message">Loading recipe details...</p>
        </div>
      </main>
    );
  }

  // Error state (invalid ID or network failure)
  if (error || !drink) {
    return (
      <main className="page-container">
        <div className="message-box">
          <p className="message error-message">{error || "Recipe not found."}</p>
          <div className="action-row">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </button>
            <Link to="/drinks" className="primary-button">
              Browse Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // TheCocktailDB lists ingredients in strIngredient1..15 and measures in strMeasure1..15
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure && measure.trim() ? measure.trim() : "To taste",
      });
    }
  }

  return (
    <main className="page-container">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Go back to previous page"
      >
        ← Go Back
      </button>

      <div className="recipe-layout">
        <img
          className="recipe-image"
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
        />

        <section className="recipe-content">
          <p className="eyebrow">RECIPE DETAILS</p>

          <div className="recipe-title-row">
            <h1>{drink.strDrink}</h1>
            {toggleFavourite && (
              <button
                type="button"
                className="heart-button heart-button-large"
                onClick={() => toggleFavourite(drink)}
                aria-label={
                  isFavourite
                    ? `Remove ${drink.strDrink} from favourites`
                    : `Add ${drink.strDrink} to favourites`
                }
                title={isFavourite ? "Remove from favourites" : "Add to favourites"}
              >
                {isFavourite ? "♥" : "♡"}
              </button>
            )}
          </div>

          <p>
            <strong>Category:</strong> {drink.strCategory || "Mocktail"}
          </p>

          <p>
            <strong>Glass:</strong> {drink.strGlass || "Serving Glass"}
          </p>

          <p>
            <strong>Type:</strong> {drink.strAlcoholic || "Non-Alcoholic"}
          </p>

          <h2>Ingredients</h2>
          {ingredients.length > 0 ? (
            <ul className="ingredient-list">
              {ingredients.map((item, index) => (
                <li key={`${item.ingredient}-${index}`}>
                  <span>{item.ingredient}</span>
                  <span>{item.measure}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="subtle-text">
              No specific ingredient quantities listed for this drink.
            </p>
          )}

          <h2>Instructions</h2>
          <p className="instructions">
            {drink.strInstructions ||
              "Instructions are not currently available for this drink."}
          </p>
        </section>
      </div>
    </main>
  );
}

export default DrinkDetails;