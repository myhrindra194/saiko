/* eslint-disable react/prop-types */
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

const NavBar = ({ handleToogleTheme, theme }) => {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {showModal &&
        createPortal(
          <Modal closeModal={() => setShowModal(false)} />,
          document.body
        )}
      <nav className="w-full h-auto font-semibold animate-fade-down animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forwards">
        <div className="my-3 flex justify-between items-center">
          <p className="font-semibold font-serif text-2xl">SaÏko</p>
          <div className="sm:hidden flex items-center">
            <button
              onClick={handleToogleTheme}
              className="text-purple-500 p-2 mr-3"
            >
              {theme === "dark" ? (
                <SunIcon className="size-6" />
              ) : (
                <MoonIcon className="size-6" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-purple-500 p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="size-8 " />
              ) : (
                <Bars3Icon className="size-8 " />
              )}
            </button>
          </div>
          <section className="sm:flex items-center gap-10 hidden">
            <ul className="flex gap-5 font-light text-sm">
              <li className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer">
                ABOUT US
              </li>
              <li className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl cursor-pointer">
                GET INVOLVED
              </li>
              <li
                className=" px-3 py-1.5 rounded-4xl border-purple-6 bg-purple-600 text-white cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                SIGN IN
              </li>
            </ul>
            <button
              onClick={handleToogleTheme}
              className="text-purple-500 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 p-2 rounded-full"
            >
              {theme === "dark" ? (
                <SunIcon className="size-8" />
              ) : (
                <MoonIcon className="size-8" />
              )}
            </button>
          </section>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden flex flex-col gap-3 items-center py-4 rounded-lg w-full">
            <ul className="flex flex-col gap-3 text-white font-medium text-center w-full ">
              <li className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer">
                ABOUT US
              </li>
              <li className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-xl cursor-pointer">
                GET INVOLVED
              </li>
              <li
                className="px-3 py-1.5 rounded-xl border-purple-600 bg-purple-600 text-white cursor-pointer "
                onClick={() => setShowModal(true)}
              >
                SIGN IN
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
