import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import NavBar from "./components/NavBar";

const App = () => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToogleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="h-screen w-full justify-between flex flex-col dark:g-gradient-to-br dark:from-indigo-950 dark:text-slate-200 dark:via-slate-900 dark:to-slate-950  bg-gradient-to-tr from-purple-300 via-indigo-600/30 to-blue-500/50 text-slate-900 md:px-20 px-8">
      <NavBar handleToogleTheme={handleToogleTheme} theme={theme} />
      <Banner />
    </div>
  );
};

export default App;
