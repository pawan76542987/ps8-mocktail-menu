import { Link } from "react-router-dom";

function DrinkCard({
  drink,
  isFavourite,
  toggleFavourite,
}) {
  return (
    <article className="drink-card">
      <Link to={`/drinks/${drink.idDrink}`}>
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          loading="lazy"
        />

        <div className="card-info">
          <h3>{drink.strDrink}</h3>
          <p>Non-Alcoholic</p>
        </div>
      </Link>

      <button
        className="heart-button"
        onClick={() => toggleFavourite(drink)}
        aria-label={
          isFavourite
            ? "Remove from favourites"
            : "Add to favourites"
        }
      >
        {isFavourite ? "♥" : "♡"}
      </button>
    </article>
  );
}

export default DrinkCard;