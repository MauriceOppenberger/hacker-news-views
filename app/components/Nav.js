import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../context/theme";

export default function Nav() {
  const activeStyle = {
    color: "rgb(187, 46, 31)"
  };
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
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
                <NavLink
                  to="/new"
                  activeStyle={activeStyle}
                  className="nav-link"
                >
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
      )}
    </ThemeConsumer>
  );
}
