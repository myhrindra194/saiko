import { useEffect } from "react";
import Banner from "../components/Banner";
import NavBar from "../components/NavBar";

const Home = () => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflowY = "auto";
    }, 1000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="h-screen w-full justify-between flex flex-col dark:bg-gradient-to-br dark:from-indigo-950 dark:text-slate-200 dark:via-slate-900 dark:to-slate-950 bg-gradient-to-tr from-purple-300 via-indigo-600/30 to-blue-500/50 text-slate-900 md:px-20 px-8">
      <NavBar />
      <Banner />
    </div>
  );
};

export default Home;
