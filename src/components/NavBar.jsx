/* eslint-disable react/prop-types */
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

const NavBar = ({ handleToogleTheme, theme }) => {
  return (
    <nav className="w-full h-16 font-semibold animate-fade-down animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forwards">
      <div className="my-3 flex justify-between items-center">
        <p className="font-semibold font-serif text-2xl">SaÏko</p>
        <section className="md:flex items-center gap-10">
          <ul className="flex gap-5 font-light text-sm max-md:hidden">
            <li className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl">
              ABOUT US
            </li>
            <li className="px-3 py-1.5 dark:hover:bg-slate-600/50 hover:bg-slate-200/40 rounded-4xl">
              GET INVOLVED
            </li>
            <li className=" px-3 py-1.5 rounded-4xl border-purple-6 bg-purple-600 text-white">
              SIGN IN
            </li>
          </ul>
          <button
            onClick={handleToogleTheme}
            className="max-lg:me-2 text-purple-500 dark:dark:hover:bg-slate-600/50 hover:bg-slate-200/40 p-2 rounded-full"
          >
            {theme === "dark" ? (
              <SunIcon className="size-6" />
            ) : (
              <MoonIcon className="size-6" />
            )}
          </button>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
