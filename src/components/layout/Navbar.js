import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AiFillGithub } from "react-icons/ai";

const Navbar = (props) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <AiFillGithub /> Hey there, {props.name}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  name: "Daniel",
};

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Navbar;
