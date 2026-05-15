import { Link } from "react-router";
import { PageMasthead } from "../../src/components/PageMasthead";

const decisions = [
  "Use React Router Framework Mode so pages, layouts, and route data can grow naturally.",
  "Keep the visual engine framework-agnostic enough to move between pages or demos.",
  "Favor visible interaction over static screenshots because the mask is the product.",
  "Ship a real SSR build, not only a local toy, so the project reads well on GitHub."
];

const signals = [
  "Canvas rendering",
  "SSR hydration",
  "Route-based pages",
  "Typed React modules",
  "Responsive interface",
  "Portfolio narrative"
];

export default function ProcessRoute() {
  return (
    <main className="page-shell page-shell--wide">
      <PageMasthead />

      <section className="page-hero">
        <p className="eyebrow">engineering notes</p>
        <h1>A small project with grown-up constraints.</h1>
        <p>
          This page frames the implementation choices a reviewer would care about: boundaries,
          interaction design, rendering strategy, and how the code stays easy to extend.
        </p>
      </section>

      <section className="split-section">
        <div>
          <h2>Design decisions</h2>
          <ol className="decision-list">
            {decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ol>
        </div>
        <div>
          <h2>Technical signals</h2>
          <div className="signal-cloud" aria-label="Technical signals">
            {signals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="pull-quote">
        <p>
          The trick is making the code feel calm while the interface feels alive.
        </p>
      </section>

      <Link className="text-link" to="/system">
        See the architecture
      </Link>
    </main>
  );
}
