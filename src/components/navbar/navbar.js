import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ changePath }) => {
  return (
    <nav>
      <ul className="nav-links nav-wraper container">
        <li onClick={(e) => {changePath(e)}}>
          <Link to="/">Movies API</Link>
        </li>
        <li onClick={(e) => {changePath(e)}}>
          <Link to="/watched">Watched</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
