# Arena Circuit — FreeFire & PUBG Tournament Platform

A React + TypeScript + Tailwind CSS front end for an esports tournament website.

## Stack
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (custom blue/white design system, class-based dark mode)
- React Router (Home, Tournaments, Host, Contact, Login)
- lucide-react icons

## Getting started
```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
```

## Auth API integration

Wired against the endpoints in your API guide, base URL `http://localhost:3000/api/v1`
(override via `.env` → `VITE_API_BASE_URL`, see `.env.example`).

```
src/api/
  client.ts    # axios instance: attaches Bearer token, auto-refreshes on 401
  auth.ts      # register, login, logout, forgot/reset password, me, check-username
  errors.ts    # turns an axios error into a readable message
src/context/
  AuthContext.tsx   # session state — bootstraps from stored token via /users/me
src/types/user.ts   # User, UserRole, UserStatus
src/pages/
  Login.tsx, Register.tsx, ForgotPassword.tsx, ResetPassword.tsx
```

- Tokens are stored in `localStorage` (`arena.accessToken` / `arena.refreshToken`).
  Swap `tokenStorage` in `client.ts` for httpOnly cookies if your backend sets them.
- `Register.tsx` debounces `GET /users/check-username` by 400ms as you type.
- `/auth/register` only creates the account per the guide, so `AuthContext.register()`
  chains an immediate `/auth/login` call to establish the session.
- The Navbar's Login/Logout button and username now come from `useAuth()` —
  no more local placeholder state.
- `ResetPassword.tsx` expects a `?token=...` query param, matching an email link
  like `https://yoursite.com/reset-password?token=...`.

## Structure
```
src/
  components/
    Navbar.tsx           # top navigation, mobile hamburger menu, theme toggle, login/logout
    Footer.tsx            # site footer, credits Awadh Technology
    Hero.tsx               # homepage hero, headline + rotating tournament ad
    HostSection.tsx        # "host your own tournament" CTA section below hero
    TournamentAdCard.tsx    # reusable tournament ad card
  context/
    ThemeContext.tsx       # light/dark theme provider (persists to localStorage)
  hooks/
    useTournamentAds.ts     # fetches featured tournaments (mocked — swap for a real API call)
  types/
    tournament.ts           # TournamentAd type returned by the backend
  pages/
    Home.tsx, Tournaments.tsx, Host.tsx, Contact.tsx, Login.tsx
```

## Wiring up the real database
`src/hooks/useTournamentAds.ts` currently returns mock data after a simulated
delay. Replace `fetchFeaturedTournaments()` with a real call, e.g.:

```ts
const res = await fetch('/api/tournaments/featured')
const data: TournamentAd[] = await res.json()
```

The `TournamentAd` type in `src/types/tournament.ts` documents the exact
shape the API should return.

## Notes
- Dark mode toggles a `dark` class on `<html>`; all styling uses Tailwind's
  `dark:` variant, no separate stylesheet needed.
- Mobile is treated as the primary breakpoint — layouts stack single-column
  by default and expand at `sm:` / `lg:`.
- Auth is real: `Navbar.tsx` reads session state from `AuthContext`, which
  talks to the live API described above. Start your backend on
  `http://localhost:3000` (or set `VITE_API_BASE_URL`) before testing
  login/register/logout.
