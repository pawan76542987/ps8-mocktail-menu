import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">OOPS!</p>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <Link to="/" className="primary-button">
        Back to Home
      </Link>
    </main>
  );
}

export default NotFound;