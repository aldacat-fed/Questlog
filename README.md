# Questlog

🇸🇪 [Svenska](#svenska) | 🇬🇧 [English](#english)

---

## Svenska

Questlog är min spelbacklog. Jag lägger till spel jag vill spela, spelar just nu, har klarat eller lagt ner. Jag kan filtrera listan, öppna ett spel, ändra status, betyg och anteckningar, och ta bort spel. Appen pratar med [Questlog API](https://questlog-api.vercel.app/docs).

- **Vercel:** https://questlog-two-orcin.vercel.app
- **GitHub:** https://github.com/aldacat-fed/Questlog
- **Mitt handle:** `game-questlog`
- **Betyg jag siktar på:** VG

### Funktioner

- Lista alla spel och filtrera på status (All, Want to play, Playing, Completed, Dropped)
- Det valda filtret sparas i `localStorage` och finns kvar efter omladdning
- Egen sida per spel (`/games/:id`) med omslag, plattform, betyg och anteckningar
- Lägg till spel, ändra status, betyg och anteckningar, och ta bort spel
- Laddningsindikator och felmeddelanden, med kontroll av `response.ok`
- 404-sida för okända adresser

### Teknik

React 18, TypeScript, React Router, Vite och vanlig CSS.

### Köra appen

```bash
npm install
npm run dev
```

Öppna adressen som visas i terminalen (oftast http://localhost:5173). Bygg för produktion med `npm run build`.

Mitt handle ligger i `src/config.ts`. Vill du ha egna spel, byt handle där.

### Mappstruktur

```
src/
  api/          fetch-anrop mot API:et (anropas bara från hooks)
  hooks/        useFetch, useGames (useGames, useGame, useSaveGame), useLocalStorage
  components/   Layout, FilterBar, GameList, GameCard, GameCover, GameForm, ...
  pages/        GamesPage, GameDetailPage, NewGamePage, NotFoundPage
  config.ts     mitt handle
  types.ts      typerna Game, NewGame och Status
```

### Hur mina hooks fungerar

Komponenterna ska bara visa saker och ta emot klick. All logik för att hämta och spara data ligger i hooks, och inga komponenter eller sidor anropar `fetch` eller API-funktionerna direkt.

- **`useFetch(fetcher, deps)`** är grunden för all hämtning. Den håller state för `data`, `loading` och `error`, och hämtar om när `deps` ändras eller när `reload()` anropas. Den ignorerar svar från gamla anrop, så att ett långsamt svar inte skriver över ett nyare när man byter filter snabbt.
- **`useGames(status)`** hämtar listan och hämtar om automatiskt när filtret ändras.
- **`useGame(id)`** hämtar ett spel. Ett 404 från API:et blir ett felmeddelande som sidan visar.
- **`useSaveGame()`** samlar POST, PATCH och DELETE (`create`, `update`, `remove`). Hooken håller koll på `saving` och `error`. Varje funktion returnerar resultatet, eller `null` om det gick fel, så att sidan bara behöver kolla om det lyckades (till exempel för att navigera vidare).
- **`useLocalStorage(key, startvärde)`** fungerar som `useState` men sparar värdet i `localStorage`. Jag använder den för statusfiltret.

**Varför jag byggde så:**

- Sidorna blir korta och läsbara, eftersom laddning, fel och sparande hanteras på ett ställe.
- Samma logik behöver inte skrivas om i varje komponent, och en ändring i hur hämtning fungerar görs bara en gång.
- Det blir tydligt var gränsen går: `api/` pratar med servern, hooks hanterar state, och komponenter visar resultatet.

### Deploy

Repot är kopplat till Vercel. `vercel.json` ser till att adresser som `/games/:id` fungerar även vid omladdning.

---

## English

Questlog is my game backlog. I add games I want to play, am playing, have completed or have dropped. I can filter the list, open a game, change its status, rating and notes, and delete games. The app talks to the [Questlog API](https://questlog-api.vercel.app/docs).

- **Vercel:** https://questlog-two-orcin.vercel.app
- **GitHub:** https://github.com/aldacat-fed/Questlog
- **My handle:** `aki-questlog`
- **Target grade:** VG

### Features

- List all games and filter by status (All, Want to play, Playing, Completed, Dropped)
- The selected filter is saved in `localStorage` and survives a page reload
- A page for each game (`/games/:id`) with cover, platform, rating and notes
- Add games, change status, rating and notes, and delete games
- Loading indicator and error messages, with a check of `response.ok`
- A 404 page for unknown routes

### Tech

React 18, TypeScript, React Router, Vite and plain CSS.

### Running the app

```bash
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173). Build for production with `npm run build`.

My handle is set in `src/config.ts`. To use your own games, change the handle there.

### Folder structure

```
src/
  api/          fetch calls to the API (only called from hooks)
  hooks/        useFetch, useGames (useGames, useGame, useSaveGame), useLocalStorage
  components/   Layout, FilterBar, GameList, GameCard, GameCover, GameForm, ...
  pages/        GamesPage, GameDetailPage, NewGamePage, NotFoundPage
  config.ts     my handle
  types.ts      the Game, NewGame and Status types
```

### How my hooks work

Components should only display things and handle clicks. All logic for fetching and saving data lives in hooks, and no component or page calls `fetch` or the API functions directly.

- **`useFetch(fetcher, deps)`** is the foundation for all fetching. It keeps state for `data`, `loading` and `error`, and fetches again when `deps` change or when `reload()` is called. It ignores responses from old requests, so a slow response never overwrites a newer one when the filter is switched quickly.
- **`useGames(status)`** fetches the list and refetches automatically when the filter changes.
- **`useGame(id)`** fetches a single game. A 404 from the API becomes an error message that the page displays.
- **`useSaveGame()`** collects POST, PATCH and DELETE (`create`, `update`, `remove`). The hook tracks `saving` and `error`. Each function returns the result, or `null` if something went wrong, so the page only has to check whether it succeeded (for example to navigate on).
- **`useLocalStorage(key, initialValue)`** works like `useState` but saves the value in `localStorage`. I use it for the status filter.

**Why I built it this way:**

- Pages stay short and readable, because loading, errors and saving are handled in one place.
- The same logic doesn't have to be rewritten in every component, and a change in how fetching works only has to be made once.
- The boundaries are clear: `api/` talks to the server, hooks manage state, and components display the result.

### Deployment

The repo is connected to Vercel. `vercel.json` makes routes like `/games/:id` work even after a page reload.
