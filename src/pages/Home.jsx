import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="hero">
      <div className="hero-content">
        <p className="eyebrow">FRESH • FRUITY • ALCOHOL-FREE</p>

        <h1>
          Every Sip
          <br />
          Feels Like Summer
        </h1>

        <p>
          Discover refreshing mocktails and learn how
          to make your favourite drinks at home.
        </p>

        <Link to="/drinks" className="primary-button">
          See Menu →
        </Link>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=900&q=80"
          alt="Refreshing drinks"
        />
      </div>
    </main>
  );
}

export default Home;