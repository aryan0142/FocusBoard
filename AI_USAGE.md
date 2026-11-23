# AI Usage Disclosure

## Tools Used
- **Google Gemini** — Used as a step-by-step pair-programming assistant for architecture planning, component structuring, and Tailwind CSS layout guidance.

## AI-Assisted Areas
- Breaking down the Figma screens into modular React components (`Sidebar`, `Header`, `FocusCarousel`, `StatsGrid`, `TaskFilters`, `TaskItem`, `TaskModal`).
- Implementing Tailwind CSS responsive layouts across `390px`, `768px`, and `1440px`.
- Structuring `localStorage` lazy state initialization and accessible modal keyboard handling.

## Representative Prompts
1. *"Plan which parts I should build from the FocusBoard PDF and Figma screenshots, and guide me step-by-step using React + Vite and Tailwind CSS."*
2. *"Explain how lazy initialization in `useState` and `useEffect` syncing with `localStorage` work in `App.jsx` so I understand the state flow."*
3. *"I found an issue where marking 'Design landing page' as completed updates the stats cards, but the Focus Notes carousel card still shows 'Design landing page' at 62%—help me sync it with live task state."*
4. *"Build a reusable Create/Edit task modal with required title validation and Escape-key dismissal."*

## Suggestion Checked, Corrected, or Rejected
- **Issue Caught:** In the initial implementation of `FocusCarousel.jsx`, the AI populated the floating preview card inside the banner from static values in `focusSlides.js` (`"Design landing page"` and `62%`). When I manually tested completing `"Design landing page"` in the task list, the Overview stat cards updated accurately to `83%`, but the carousel preview card remained out of sync at `62%` still listing the completed task as `NEXT UP`.
- **Correction Made:** I flagged this mismatch and refactored `FocusCarousel.jsx` to accept the live `tasks` array and derived `completionRate` as props. The component now dynamically derives the preview card title and progress percentage from the single source of truth (`tasks`), ensuring every UI section reflects task updates immediately.

## Verification & Understanding
Every component was built incrementally, tested manually across desktop, tablet, and mobile viewports, and verified for persistence, combined filter behavior, validation errors, and keyboard navigation.