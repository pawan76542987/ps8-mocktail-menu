import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function DrinkDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getDrink() {
      try {
        setLoading(true);
        setError("");
        setDrink(null);

        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`
        );

        if (!response.ok) {
          throw new Error("Could not load the recipe.");
        }

        const data = await response.json();

        if (!data.drinks || !data.drinks.length) {
          throw new Error("Drink not found.");
        }

        setDrink(data.drinks[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getDrink();
  }, [id]);

  if (loading) {
    return <p className="message">Loading recipe...</p>;
  }

  if (error) {
    return (
      <main className="page-container">
        <p className="message">{error}</p>
        <Link to="/drinks" className="primary-button">
          Back to Menu
        </Link>
      </main>
    );
  }

  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient,
        measure: measure || "",
      });
    }
  }

  return (
    <main className="page-container">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
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
          <p className="eyebrow">YOUR NEXT FAVOURITE DRINK</p>
          <h1>{drink.strDrink}</h1>

          <p>
            <strong>Category:</strong>{" "}
            {drink.strCategory || "Not available"}
          </p>

          <p>
            <strong>Glass:</strong>{" "}
            {drink.strGlass || "Not available"}
          </p>

          <p>
            <strong>Type:</strong>{" "}
            {drink.strAlcoholic || "Not available"}
          </p>

          <h2>Ingredients</h2>

          <ul className="ingredient-list">
            {ingredients.map((item, index) => (
              <li key={`${item.ingredient}-${index}`}>
                <span>{item.ingredient}</span>
                <span>{item.measure}</span>
              </li>
            ))}
          </ul>

          <h2>Instructions</h2>
          <p className="instructions">
            {drink.strInstructions ||
              "Instructions are not available for this drink."}
          </p>
        </section>
      </div>
    </main>
  );
}

export default DrinkDetails;