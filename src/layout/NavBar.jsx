import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router";
import saikoDark from "../assets/saiko_dark.png";
import saikoLight from "../assets/saiko_light.png";
import Loader from "../components/Loader";
import UserDropdown from "../components/UserDropdown";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, loading, logout } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return <Loader />;
  }

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

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

      <nav className="w-full h-auto font-semibold  md:px-20 px-8 py-2 dark:border-b-slate-600/40 border-b-slate-200/40 border-b fixed top-0 bg-transparent z-50 backdrop-blur-3xl">
        <div className="flex items-center relative">
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img
                src={theme == "dark" ? saikoDark : saikoLight}
                alt="logo"
                className="w-20 h-auto"
              />
            </NavLink>
          </div>

          <section className="hidden sm:flex flex-1 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 ">
            <ul className="flex gap-5 font-light text-sm justify-center">
              {user ? (
                <>
                  <NavLink
                    to="/chatbot"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                  >
                    CHATBOT
                  </NavLink>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                  >
                    VOCAL
                  </NavLink>
                  <NavLink
                    to="/blog"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                  >
                    BLOG
                  </NavLink>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                  >
                    COMMUNAUTÉ
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                  >
                    ABOUT US
                  </NavLink>
                  <NavLink
                    to="/service"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                  >
                    SERVICE
                  </NavLink>
                  <NavLink
                    to="/blog"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                  >
                    BLOG
                  </NavLink>
                </>
              )}
            </ul>
          </section>

          <section className="hidden sm:flex items-center gap-4 text-sm font-light ml-auto">
            {user ? (
              <>
                <UserDropdown user={user} logout={handleLogout} />
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
              </>
            ) : (
              <>
                <button
                  className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer"
                  onClick={() => setShowRegisterModal(true)}
                >
                  SIGN UP
                </button>
                <button
                  className="px-3 py-1.5 rounded-4xl border-purple-600 border hover:bg-purple-600 cursor-pointer hover:text-white"
                  onClick={() => setShowLoginModal(true)}
                >
                  LOGIN
                </button>
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
              </>
            )}
          </section>

          <div className="sm:hidden flex items-center ml-auto">
            {user && (
              <div className="mr-3">
                <UserDropdown user={user} logout={handleLogout} mobile />
              </div>
            )}
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
        </div>

        {isMenuOpen && (
          <div className="sm:hidden flex flex-col gap-3 items-center py-4 rounded-lg w-full">
            <ul className="flex flex-col gap-3 font-medium text-center w-full">
              {user ? (
                <>
                  <NavLink
                    to="/chatbot"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    CHATBOT
                  </NavLink>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    VOCAL
                  </NavLink>
                  <NavLink
                    to="/blog"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    BLOG
                  </NavLink>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    COMMUNAUTÉ
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ABOUT US
                  </NavLink>
                  <NavLink
                    to="/services"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    SERVICE
                  </NavLink>
                  <NavLink
                    to="/blog"
                    className={({ isActive }) =>
                      `px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer ${
                        isActive
                          ? "text-purple-600 font-medium"
                          : "text-inherit"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    BLOG
                  </NavLink>
                  <button
                    className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer"
                    onClick={() => {
                      setShowRegisterModal(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    SIGN UP
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-xl border-purple-600 bg-purple-600 text-white cursor-pointer"
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    LOGIN
                  </button>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
