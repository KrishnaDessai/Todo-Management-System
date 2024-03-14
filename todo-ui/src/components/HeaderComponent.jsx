import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../Services/Authservice";


const HeaderComponent = () => {

    const navigator =useNavigate();

    function handleLogout(){
       logout(); 
       navigator("/login");
    }
  const isAuth = isUserLoggedIn();

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div>
          <a href="http://localhost:3000" className="bavbar-brand">
            Todo Management System
          </a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            {isAuth && (
              <li className="nav-item">
                <NavLink to="/todos" className="nav-link">
                  Todos
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <ul className="navbar-nav">
          {!isAuth && (
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
          )}

          {!isAuth && (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          )}

        { isAuth && (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
