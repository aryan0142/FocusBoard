# FocusBoard — Task Dashboard

A responsive, single-user task management dashboard built with **React + Vite** and **Tailwind CSS** based on the FocusBoard Figma design.

- **Live Demo:** _Add Vercel URL here_
- **GitHub Repository:** https://github.com/aryan0142/FocusBoard

## Features

- **Full Task CRUD:** Create new tasks with required-title validation, edit existing tasks in a reusable modal, update task statuses (`To do`, `In progress`, `Completed`), and delete tasks with confirmation.
- **Combined Search & Filtering:** Real-time case-insensitive title search, status tabs (`All`, `In progress`, `Completed`), and priority filtering (`All`, `High`, `Medium`, `Low`) that work together seamlessly.
- **Dynamic Overview Statistics:** Total tasks, in-progress count, completed count, and completion percentage are derived directly from task state—never hardcoded.
- **Interactive Focus Notes Carousel:** All three Focus Notes slides with previous/next controls, clickable slide indicators, and live-synced task preview progress.
- **Browser Persistence:** Tasks are saved to `localStorage` and restored on page load without overwriting saved data with seed tasks.
- **Responsive & Accessible:** Tested across `390px` (mobile), `768px` (tablet), and `1440px` (desktop) viewports with semantic HTML, ARIA attributes, keyboard focus states, and `Escape`-key modal dismissal.

## State Management Choice

This project uses **React Hooks (`useState` and `useEffect`) lifted to `App.jsx`** as the single source of truth:

- **Why not Redux/Zustand?** For a single-user dashboard with one core entity (`tasks`) and shallow component depth (1–2 levels), local React state avoids unnecessary boilerplate while keeping data flow transparent and predictable.
- **Lazy Initialization:** `useState(() => ...)` reads `localStorage` synchronously once on initial mount with `try/catch` and array validation, ensuring saved user edits are never overwritten by sample data.
- **Derived Values:** Statistics (`totalTasks`, `inProgressCount`, `completedCount`, `completionRate`) and `filteredTasks` are computed during render rather than duplicated in state, eliminating sync bugs.
- **Immutable Updates:** All add, edit, toggle, and delete operations use `.map()`, `.filter()`, and spread syntax without mutating existing state.


## Local Setup

```bash
git clone https://github.com/aryan0142/FocusBoard.git
cd FocusBoard
npm install
npm run dev
```

To create a production build:

```bash
npm run build
npm run preview
```

## Scope Notes & Limitations

- **Frontend-only:** Uses browser `localStorage` for persistence; no backend API or authentication is included.
- **Placeholder Navigation Items:** `Calendar`, `Settings`, and the user profile menu (`JD`) are visual navigation placeholders per the assignment scope, while `Overview` and `My tasks` display the active dashboard workflow.
