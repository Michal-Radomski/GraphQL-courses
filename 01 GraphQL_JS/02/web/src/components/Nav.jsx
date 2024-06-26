import React from "react";
import * as R from "ramda";
import { NavLink } from "react-router-dom";

const className = "f6 f5-l link bg-animate black-80 hover-bg-black-10 dib pa3 ph4-l outline-transparent w6 underline";

const links = [
  { name: "Home", to: "/" },
  { name: "Add Book", to: "/add" },
];

const navLink = R.curry((_pathName, className, link) => {
  const { name, to } = link;
  return (
    <NavLink to={to} key={to} className={({ isActive }) => (isActive ? `${className} fw6 underline` : className)}>
      {name}
    </NavLink>
  );
});

const Nav = (props) => {
  const pathName = R.path(["url", "pathname"], props);
  return <nav className="bt bb center mt3">{R.map(navLink(pathName, className), links)}</nav>;
};

export default Nav;
