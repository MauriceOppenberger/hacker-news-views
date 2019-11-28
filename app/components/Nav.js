import React from "react";
import { NavLink } from "react-router-dom";
import ThemeContext from "../context/theme";

export default function Nav({ toggleTheme }) {
  const activeStyle = {
    color: "rgb(187, 46, 31)"
  };
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className="top-nav">
      <nav className="flex-container space-between">
        <ul className="row">
          <li className="nav-item">
            <NavLink
              to="/"
              exact
              activeStyle={activeStyle}
              className="nav-link"
            >
              Top
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" activeStyle={activeStyle} className="nav-link">
              New
            </NavLink>
          </li>
        </ul>
        <button
          className="btn-clear"
          style={{ fontSize: 30 }}
          onClick={toggleTheme}
        >
          {theme === "light" ? "🔦" : "💡"}
        </button>
      </nav>
    </div>
  );
}
