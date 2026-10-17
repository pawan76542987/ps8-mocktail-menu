import { Link } from "react-router-dom";

// Placeholder image in case an external API image fails to load
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80";

function DrinkCard({ drink, isFavourite, toggleFavourite }) {
  return (
    <article className="drink-card">
      <Link
        to={`/drinks/${drink.idDrink}`}
        className="card-link"
        aria-label={`View recipe for ${drink.strDrink}`}
      >
        <img
          src={drink.strDrinkThumb || FALLBACK_IMAGE}
          alt={drink.strDrink}
          loading="lazy"
          onError={(e) => {
            // Prevent infinite loop if fallback fails
            if (e.currentTarget.src !== FALLBACK_IMAGE) {
              e.currentTarget.src = FALLBACK_IMAGE;
            }
          }}
        />

        <div className="card-info">
          <h3>{drink.strDrink}</h3>
          <p>Non-Alcoholic</p>
        </div>
      </Link>

      <button
        type="button"
        className="heart-button"
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
    </article>
  );
}

export default DrinkCard;