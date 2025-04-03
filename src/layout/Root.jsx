import { useContext } from "react";
import { Outlet } from "react-router";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import NavBar from "./NavBar";

const Root = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div className="min-h-screen w-full flex flex-col  dark:bg-gradient-to-br dark:from-indigo-950 dark:text-slate-200  overflow-x-hidden dark:via-slate-900 dark:to-slate-950 bg-gradient-to-tr from-purple-300 via-indigo-600/30 to-blue-500/50 text-slate-900 absolute">
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <NavBar />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Root;
