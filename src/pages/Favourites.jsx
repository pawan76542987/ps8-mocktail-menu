import { Link } from "react-router-dom";
import DrinkCard from "../components/DrinkCard";

function Favourites({ favourites = [], toggleFavourite }) {
  return (
    <main className="page-container">
      <div className="section-heading">
        <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
        <h1>Favourite Drinks</h1>
        <p>Your saved mocktails in one convenient place.</p>
      </div>

      {favourites.length === 0 ? (
        <div className="message-box">
          <p className="message">
            You haven&rsquo;t saved any favourite mocktails yet.
          </p>
          <Link to="/drinks" className="primary-button">
            Browse Drinks Menu →
          </Link>
        </div>
      ) : (
        <div className="drink-grid">
          {favourites.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
              isFavourite={true}
              toggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favourites;