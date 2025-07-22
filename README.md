# Blitzcore

A scoring app for Dutch Blitz, in Svelte/SvelteKit

## Features

- Supports 2-8 players
- Automatic score [re-]calculation
- Game-specific "just enough" UI
- Light/Dark mode

## Still Todo
- Can we force the browser to hide the chrome? The back button can interfere
- Store the actual game state whenever it changes (to avoid reset on accidental back-navigation)
- Tips for first-time players
  - Settings checkbox
  - Point to the empty row once the game begins
  - Point to the "add row" button once one round is complete 


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
