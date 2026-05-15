import { PortfolioNav } from "./PortfolioNav";

type HeaderProps = {
  clockLabel: string;
};

export function Header({ clockLabel }: HeaderProps) {
  return (
    <header>
      <div className="brand">
        <img className="brand-mark" src="/logo.svg" alt="" />
        <div>
          <div className="eyebrow">generative typography system</div>
          <h1>Bitmask Atelier</h1>
        </div>
      </div>
      <div className="header-actions">
        <PortfolioNav />
        <div className="clock">{clockLabel}</div>
      </div>
    </header>
  );
}
