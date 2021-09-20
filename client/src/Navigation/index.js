import React from "react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/nuggets" activeStyle={{ color: "teal" }}>
            Nuggets
          </NavLink>
        </li>
        <li>
          <NavLink to="/nugget/create" activeStyle={{ color: "teal" }}>
            Create
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
