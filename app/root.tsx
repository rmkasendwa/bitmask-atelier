import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "../src/styles.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bitmask Atelier is an interactive React Router and TypeScript typography system that renders text through an animated binary mask."
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Bitmask Atelier</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
