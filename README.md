# Nexgensis — Book Management System

A Book Management System named as Bibliotheca built with React + Vite.

## Features

- **View** books in grid or list layout
- **Add** books via a validated modal form
- **Edit** existing book entries inline
- **Delete** books with a two-step confirmation guard
- **Search** by title or author (real-time)
- **Filter** by genre with live counts
- **Sort** by title, author, year, or star rating
- **Star ratings** (1–5) per book
- **Cover images** from URL, with live preview in the form
- **Persistent storage** via localStorage (mock API)
- **Loading & error states** on all async operations
- **Toast notifications** for all CRUD feedback
- Keyboard accessible (ESC to close modals, ARIA labels)

## Tech Stack

- **React 18** — functional components, hooks
- **Vite 5** — dev server and build
- **CSS custom properties (tailwind was avoided)** — dark editorial theme 
- **localStorage** — mock persistence layer with async simulation

## Project Structure

```
src/
├── utils/
│   └── api.js          # Mock API (localStorage + default data)
├── hooks/
│   ├── useBooks.js     # CRUD state management
│   └── useFilters.js   # Search / filter / sort logic
├── components/
│   ├── BookCard.jsx    # Grid card with cover, genre badge, actions
│   ├── BookListItem.jsx # Compact list row
│   ├── BookForm.jsx    # Add/edit form with validation
│   ├── FilterBar.jsx   # Search + genre + sort + view toggle
│   ├── Modal.jsx       # Accessible overlay
│   ├── StarRating.jsx  # Interactive star rating
│   └── Toast.jsx       # Slide-up notification
├── App.jsx             # Root: composes all components
├── main.jsx
└── index.css
```

## Local Development

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploy to Vercel (recommended)

```bash
# Option 1 — Vercel CLI
npm i -g vercel
vercel

# Option 2 — GitHub integration
# 1. Push this repo to GitHub
# 2. Go to vercel.com → New Project → Import your repo
# 3. Framework: Vite (auto-detected)
# 4. Click Deploy
```

## Replacing the Mock API with a Real Backend

The entire API surface lives in `src/utils/api.js`.
Swap the four methods (`getAll`, `create`, `update`, `delete`) with real `fetch` calls:

```js
// Example: replace with JSONPlaceholder / your own REST endpoint
export const api = {
  async getAll() {
    const res = await fetch('https://your-api.com/books');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  },
  async create(data) {
    const res = await fetch('https://your-api.com/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  // ... update, delete follow the same pattern
};
```

No changes required anywhere else in the codebase.
