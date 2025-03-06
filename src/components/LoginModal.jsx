/* eslint-disable react/prop-types */
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const LoginModal = ({ closeModal, openRegisterModal }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 bg-slate-300/10 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-slate-100 dark:bg-slate-700 dark:text-slate-200 p-8 rounded-lg w-96 max-sm:mx-5">
        <div className="flex justify-between">
          <h2 className="text-xl mb-4">Login</h2>
          <XMarkIcon className="size-6 cursor-pointer" onClick={closeModal} />
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-sm" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded mt-2 outline-purple-600 dark:outline-slate-200"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-sm" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded mt-2 outline-purple-600 dark:outline-slate-200"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-500 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="size-5" />
              ) : (
                <EyeSlashIcon className="size-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white p-2 rounded-lg hover:bg-purple-600 hover:ring-1 hover:ring-purple-500"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-center">
          Do not have an account?{" "}
          <button onClick={openRegisterModal} className="text-blue-500">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
