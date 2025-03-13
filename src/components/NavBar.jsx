import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";

const NavBar = () => {
  const { theme, toggleTheme } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {showLoginModal &&
        createPortal(
          <LoginModal
            closeModal={() => setShowLoginModal(false)}
            openRegisterModal={() => {
              setShowLoginModal(false);
              setShowRegisterModal(true);
            }}
          />,
          document.body
        )}

      {showRegisterModal &&
        createPortal(
          <RegistrationModal
            closeModal={() => setShowRegisterModal(false)}
            openLoginModal={() => {
              setShowRegisterModal(false);
              setShowLoginModal(true);
            }}
          />,
          document.body
        )}

      <nav className="w-full h-auto font-semibold animate-fade-down animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forwards">
        <div className="my-3 flex justify-between items-center">
          <NavLink to="/" className="font-semibold font-serif text-2xl">
            SaÏko
          </NavLink>
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="text-purple-500 p-1.5 mr-3 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-full"
            >
              {theme === "dark" ? (
                <SunIcon className="size-7" />
              ) : (
                <MoonIcon className="size-7" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-purple-500 p-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-full"
            >
              {isMenuOpen ? (
                <XMarkIcon className="size-7" />
              ) : (
                <Bars3Icon className="size-7" />
              )}
            </button>
          </div>
          <section className="sm:flex items-center gap-10 hidden">
            <ul className="flex gap-5 font-light text-sm">
              <NavLink
                to="/about"
                className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer"
              >
                ABOUT US
              </NavLink>

              <NavLink
                to="/"
                className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer"
              >
                BLOG
              </NavLink>
              <li
                className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer"
                onClick={() => setShowRegisterModal(true)}
              >
                SIGN UP
              </li>
              <li
                className="px-3 py-1.5 rounded-4xl border-purple-600 bg-purple-600 text-white cursor-pointer"
                onClick={() => setShowLoginModal(true)}
              >
                LOGIN
              </li>
            </ul>
            <button
              onClick={toggleTheme}
              className="text-purple-500 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 p-1.5 rounded-full"
            >
              {theme === "dark" ? (
                <SunIcon className="size-6" />
              ) : (
                <MoonIcon className="size-6" />
              )}
            </button>
          </section>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden flex flex-col gap-3 items-center py-4 rounded-lg w-full">
            <ul className="flex flex-col gap-3 text-white font-medium text-center w-full">
              <NavLink
                to="/about"
                className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer"
              >
                ABOUT US
              </NavLink>
              <NavLink
                to="/"
                className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer"
              >
                BLOG
              </NavLink>
              <NavLink
                className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer"
                onClick={() => setShowRegisterModal(true)}
              >
                SIGN UP
              </NavLink>
              <NavLink
                className="px-3 py-1.5 rounded-xl border-purple-600 bg-purple-600 text-white cursor-pointer"
                onClick={() => setShowLoginModal(true)}
              >
                LOGIN
              </NavLink>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
