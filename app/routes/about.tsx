import { Link } from "react-router";
import { PageMasthead } from "../../src/components/PageMasthead";

export default function AboutRoute() {
  return (
    <main className="page-shell page-shell--wide">
      <PageMasthead />

      <section className="page-hero">
        <p className="eyebrow">case study</p>
        <h1>Bitmask Atelier turns typography into a living surface.</h1>
        <p>
          This portfolio piece combines generative typography, a canvas-backed alpha mask, and
          React Router SSR. It is built to be inspected: the visual result is expressive, while
          the code is split into obvious boundaries.
        </p>
      </section>

      <section className="feature-grid" aria-label="Project highlights">
        <article className="feature-card">
          <span className="feature-number">01</span>
          <h2>Interactive Type</h2>
          <p>Pointer movement reshapes the binary field through a live canvas mask.</p>
        </article>
        <article className="feature-card">
          <span className="feature-number">02</span>
          <h2>Maintainable React</h2>
          <p>Routes, components, hooks, and pure rendering utilities each have a clear job.</p>
        </article>
        <article className="feature-card">
          <span className="feature-number">03</span>
          <h2>Portfolio Ready</h2>
          <p>Supporting pages explain the craft, tradeoffs, and architecture behind the demo.</p>
        </article>
      </section>

      <div className="page-actions">
        <Link className="primary-link" to="/">
          Launch the mask
        </Link>
        <Link className="text-link" to="/process">
          Read the notes
        </Link>
      </div>
    </main>
  );
}
