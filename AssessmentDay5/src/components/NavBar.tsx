import React from "react";
import { NavLink, useNavigate } from "react-router";

const NavBar: React.FC<{
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const logoutfunction = () => {
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <nav className="header">
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({ color: isActive ? "green" : "black" })}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={({ isActive }) => ({ color: isActive ? "green" : "black" })}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/students"
            style={({ isActive }) => ({ color: isActive ? "green" : "black" })}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Students
          </NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <button className="linkButton" onClick={logoutfunction}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                color: isActive ? "green" : "black",
              })}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
