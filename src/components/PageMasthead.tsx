import { Link } from "react-router";
import { PortfolioNav } from "./PortfolioNav";

export function PageMasthead() {
  return (
    <div className="page-masthead">
      <Link className="page-brand" to="/" aria-label="Bitmask Atelier home">
        <img className="brand-mark" src="/logo.svg" alt="" />
        <span>Bitmask Atelier</span>
      </Link>
      <PortfolioNav />
    </div>
  );
}
