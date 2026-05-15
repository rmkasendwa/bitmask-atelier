# Bitmask Atelier

An SSR React Router + TypeScript generative typography project. Bitmask Atelier renders a binary text composition on the server, then hydrates into an interactive canvas-driven mask in the browser.

The project is framed as a portfolio case study: the home route is the live interaction, while the supporting pages explain the design decisions, rendering strategy, and maintainable code boundaries.

## Inspiration

This project draws inspiration from the binary text treatment on the [Tensora homepage](https://www.tensora.com/), where Tao appears through a field of binary characters. Bitmask Atelier is an independent implementation and is not affiliated with Tensora.

## Highlights

- React Router Framework Mode with SSR.
- Canvas-backed glyph masking and pointer interaction.
- Reusable components, hooks, and pure rendering utilities.
- Custom SVG logo and favicon in `public/`.
- Portfolio pages that document architecture and implementation tradeoffs.

## Routes

Routes are configured in `app/routes.ts`.

- `/` renders `app/routes/home.tsx`
- `/about` renders `app/routes/about.tsx`
- `/process` renders `app/routes/process.tsx`
- `/system` renders `app/routes/system.tsx`

To add a page, create a route module in `app/routes/` and register it in `app/routes.ts`.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
```

The development server runs at `http://localhost:5173`.
