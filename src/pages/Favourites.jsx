import DrinkCard from "../components/DrinkCard";

function Favourites({ favourites, toggleFavourite }) {
  return (
    <main className="page-container">
      <div className="section-heading">
        <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
        <h1>Favourite Drinks</h1>
        <p>Your saved mocktails in one place.</p>
      </div>

      {favourites.length === 0 ? (
        <p className="message">
          No favourites yet. Explore the menu and add a drink!
        </p>
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