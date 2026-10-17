import { Link, NavLink } from "react-router-dom";

function Navbar({ favouriteCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Sip & Smile
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/drinks">Menu</NavLink>

        <NavLink to="/favourites">
          Favourites ({favouriteCount})
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;