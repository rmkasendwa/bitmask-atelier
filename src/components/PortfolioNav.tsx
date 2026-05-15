import { NavLink } from "react-router";

const navItems = [
  { to: "/", label: "Mask" },
  { to: "/about", label: "Case Study" },
  { to: "/process", label: "Notes" },
  { to: "/system", label: "System" }
];

export function PortfolioNav() {
  return (
    <nav className="site-nav" aria-label="Portfolio sections">
      {navItems.map((item) => (
        <NavLink
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          end={item.to === "/"}
          key={item.to}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
