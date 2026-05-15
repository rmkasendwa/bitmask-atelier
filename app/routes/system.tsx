import { Link } from "react-router";
import { PageMasthead } from "../../src/components/PageMasthead";

const layers = [
  {
    name: "Interaction Layer",
    detail: "React route modules keep page concerns separate from the reusable mask engine."
  },
  {
    name: "Mask Engine",
    detail: "Canvas samples glyph alpha data and pointer position to decide which cells become active."
  },
  {
    name: "Binary Field",
    detail: "A deterministic seed initializes the field, then animation mutates a small surface area per frame."
  },
  {
    name: "SSR Shell",
    detail: "React Router renders the first document pass, then the browser hydrates the interactive canvas behavior."
  }
];

export default function SystemRoute() {
  return (
    <main className="page-shell page-shell--wide">
      <PageMasthead />

      <section className="page-hero">
        <p className="eyebrow">system design</p>
        <h1>Readable architecture for a playful interface.</h1>
        <p>
          The project is intentionally small, but it is structured like production work: routes
          describe pages, components describe UI, hooks own lifecycle behavior, and pure modules
          hold the binary and canvas math.
        </p>
      </section>

      <section className="feature-grid" aria-label="Architecture layers">
        {layers.map((layer, index) => (
          <article className="feature-card" key={layer.name}>
            <span className="feature-number">{String(index + 1).padStart(2, "0")}</span>
            <h2>{layer.name}</h2>
            <p>{layer.detail}</p>
          </article>
        ))}
      </section>

      <section className="code-map" aria-label="Code map">
        <div>
          <h2>Where to look</h2>
          <p>
            The route layer lives in <code>app/</code>. The reusable application code lives in
            <code> src/</code>.
          </p>
        </div>
        <pre>{`app/routes.ts
app/routes/home.tsx
src/hooks/useBinaryMask.ts
src/binaryText.ts
src/maskCanvas.ts`}</pre>
      </section>

      <Link className="text-link" to="/">
        Return to the interactive mask
      </Link>
    </main>
  );
}
