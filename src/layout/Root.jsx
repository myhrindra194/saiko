import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const Root = () => {
  return (
    <div className="min-h-screen w-full flex flex-col dark:bg-gradient-to-br dark:from-indigo-950 dark:text-slate-200 dark:via-slate-900 dark:to-slate-950 bg-gradient-to-tr from-purple-300 via-indigo-600/30 to-blue-500/50 text-slate-900  ">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Root;
