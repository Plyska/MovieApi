import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav-links nav-wraper container">
        <li>
          <Link to="/">Movies API</Link>
        </li>
        <li>
          <Link to="/watched">Watched</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
