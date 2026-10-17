# PS8 — Mocktail Menu Web Application

A clean, responsive, single-page React web application designed for browsing non-alcoholic mocktails, discovering recipes, and saving personal favourites. Built as a college assignment for **PS8: Mocktail Menu**.

---

## 📌 Project Overview

- **Course:** B.Tech Computer Science & Engineering (1st Year)
- **Assignment:** Problem Statement 8 (PS8) — Mocktail Menu
- **Framework & Tooling:** React 19, Vite 8, React Router v7, Vanilla CSS
- **Data Source:** [TheCocktailDB Open API](https://www.thecocktaildb.com/)

---

## ✨ Features Implemented

1. **Home Page (`/`)**
   - Clean hero landing section with high-resolution imagery and direct call-to-action button to explore the drinks menu.
2. **Drinks Menu Page (`/drinks`)**
   - Fetches and displays a responsive grid of non-alcoholic mocktails dynamically from TheCocktailDB API.
   - Real-time client-side search by drink name with whitespace trimming and single-click clear button (`✕`).
   - Pure React retry mechanism on network errors (no full browser refresh).
3. **Recipe Details Page (`/drinks/:id`)**
   - Dynamic routing using `useParams()` to fetch single drink recipe by ID (`lookup.php?i={id}`).
   - Displays drink photo, category, glass type, alcoholic classification, ingredient list with measurements, and step-by-step preparation instructions.
   - Fallback text for missing instructions or measurements.
   - Ability to add or remove favourite directly from the recipe page.
4. **Favourites Collection (`/favourites`)**
   - Displays user's saved drinks.
   - Persisted across page reloads and browser sessions using `localStorage`.
   - Real-time badge counter on the navigation bar.
   - Empty state with a direct button to explore the menu.
5. **404 Not Found Page (`*`)**
   - Friendly error page for unrecognised URLs with a button returning to Home.
6. **Responsive & Accessible Design**
   - Fully responsive for mobile (single column), tablet (2 columns), and desktop (3 columns).
   - Clear loading spinners, accessible `aria-label` tags, and visible keyboard `:focus-visible` outlines.

---

## 🛠️ Technology Stack

| Technology | Purpose | Version |
| :--- | :--- | :--- |
| **React** | Component-based UI library | `^19.2.8` |
| **Vite** | Next-generation frontend build tool | `^8.3.0` |
| **React Router** | Declarative client-side routing | `^7.18.4` |
| **Vanilla CSS** | Custom styling, CSS Grid, Flexbox, media queries | Standard CSS3 |
| **Oxlint** | Fast JavaScript/React linter | `^1.81.0` |

---

## 🌐 API Endpoints Used

All drink data is sourced from **TheCocktailDB** public API:

1. **Non-Alcoholic Drinks List:**
   - **URL:** `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
   - **Method:** `GET`
   - **Usage:** Fetches drink thumbnail, name, and unique `idDrink` for listing on `/drinks`.

2. **Drink Recipe Lookup by ID:**
   - **URL:** `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={drinkId}`
   - **Method:** `GET`
   - **Usage:** Fetches complete recipe details including ingredients (`strIngredient1` to `strIngredient15`), measures (`strMeasure1` to `strMeasure15`), glass type, and instructions (`strInstructions`).

---

## 🗂️ Project Structure

```text
ps8-mocktail-menu/
├── index.html              # HTML shell with meta tags & Google fonts
├── package.json            # Scripts & project dependencies
├── vite.config.js          # Vite configuration with React plugin
├── .oxlintrc.json          # Oxlint rules configuration
├── public/
│   └── favicon.svg         # Application favicon
└── src/
    ├── main.jsx            # React root mount point (React.StrictMode)
    ├── App.jsx             # Top-level router & global favourites state
    ├── index.css           # Global design system, typography & layouts
    ├── components/
    │   ├── Navbar.jsx      # Top navigation bar with live favourite count
    │   └── DrinkCard.jsx   # Reusable card component for drinks
    └── pages/
        ├── Home.jsx        # Landing hero page
        ├── Drinks.jsx      # Drinks listing with search & filters
        ├── DrinkDetails.jsx# Single recipe page using useParams()
        ├── Favourites.jsx  # Saved drinks page
        └── NotFound.jsx    # 404 fallback page
```

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure [Node.js](https://nodejs.org/) (version 18 or newer) is installed on your computer.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Run Linter
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🧠 Architecture & Key Concepts for Viva / Faculty Review

When explaining this project to faculty or in a lab viva, here are the key React concepts implemented:

### 1. State Management & State Lifting (`App.jsx`)
- **Concept:** `favourites` state is declared in the parent component (`App.jsx`) using `useState`.
- **Reason:** Both the navigation bar (`Navbar.jsx` needs the count) and the child pages (`Drinks.jsx`, `DrinkDetails.jsx`, `Favourites.jsx` need the list and toggle function) share this state. In React, this is called **"Lifting State Up"**.

### 2. LocalStorage Persistence
```javascript
// Read initial state safely on first load
const [favourites, setFavourites] = useState(() => {
  try {
    const saved = localStorage.getItem("mocktail_favourites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

// Sync state changes to browser storage automatically
useEffect(() => {
  localStorage.setItem("mocktail_favourites", JSON.stringify(favourites));
}, [favourites]);
```

### 3. Dynamic Routing with `useParams` (`DrinkDetails.jsx`)
- The route `/drinks/:id` captures the unique drink identifier.
- `useParams()` extracts `id`, which is then passed to `fetch(...)` to retrieve that specific recipe.

### 4. Unmounted Component Safety
- Inside `useEffect`, an `isMounted` flag is used during asynchronous `fetch` calls to avoid attempting to update component state if the user navigates away before the network request finishes.

### 5. Conditional Rendering
- The app gracefully switches between **Loading**, **Error**, and **Success** states using clean ternary operators and `if` guard clauses.

---

## 📸 Screenshots Guide

To include screenshots in your college report or presentation:

1. **Home Page:** Navigate to `/` and capture the hero banner and navigation bar.
2. **Drinks Menu & Search:** Navigate to `/drinks`, type a search query (e.g. *"Apple"*), and capture the filtered card results.
3. **Recipe Details Page:** Click on any drink (e.g. *"Apple Berry Smoothie"*) and capture the recipe layout showing ingredients and instructions.
4. **Favourites Page:** Click the heart icon on 2–3 drinks, then open `/favourites` to show the saved list and navbar badge.
5. **Responsive Mobile View:** Open Developer Tools (`F12`), toggle device mode (iPhone/Pixel), and capture the responsive mobile layout.

*Save your captured images into an `assets/screenshots/` folder if required for submission.*
