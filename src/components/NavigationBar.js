import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li className="button">
          <Link to="/">Characters</Link>
        </li>
        <li className="button">
          <Link to="/episodes">Episodes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
