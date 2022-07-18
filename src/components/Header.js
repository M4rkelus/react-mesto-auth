import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = ({ email, onSignOut, isLoggedIn }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleMenuBtnClick = () =>
    !isNavOpen ? setIsNavOpen(true) : setIsNavOpen(false);

  const handleSignOutClick = () => {
    onSignOut();
    setIsNavOpen(false);
  };

  return (
    <>
      {isLoggedIn && (
        <nav className={`${isNavOpen ? "header__nav_mobile" : "hidden "}`}>
          <p className="header__user-email_mobile">{email}</p>
          <NavLink
            to="/sign-in"
            className="header__link_mobile link"
            onClick={handleSignOutClick}
          >
            Выйти
          </NavLink>
        </nav>
      )}
      <header className="header">
        <img className="header__logo" src={logo} alt="Лого" />
        <Routes>
          <Route
            exact
            path="/sign-in"
            element={
              <nav className="header__nav">
                <NavLink to="/sign-up" className="header__link link">
                  Регистрация
                </NavLink>
              </nav>
            }
          />
          <Route
            exact
            path="/sign-up"
            element={
              <nav className="header__nav">
                <NavLink to="/sign-in" className="header__link link">
                  Войти
                </NavLink>
              </nav>
            }
          />
          <Route
            exact
            path="/"
            element={
              <>
                <nav className="header__nav">
                  <p className="header__user-email">{email}</p>
                  <NavLink
                    to="/sign-in"
                    className="header__link link"
                    onClick={onSignOut}
                  >
                    Выйти
                  </NavLink>
                </nav>
                <button
                  className={`${
                    !isNavOpen ? "header__nav-btn" : "header__nav-btn_close"
                  }`}
                  type="button"
                  onClick={handleMenuBtnClick}
                ></button>
              </>
            }
          />
        </Routes>
      </header>
    </>
  );
};

export default Header;
