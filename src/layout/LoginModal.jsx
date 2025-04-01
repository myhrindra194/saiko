/* eslint-disable react/prop-types */
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import ToastError from "../components/ToastError";
import { authenticateUser } from "../services/auth";

const LoginModal = ({ closeModal, openRegisterModal }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await authenticateUser(user.email, user.password);

    if (res.success) {
      console.log("User successfuly logged in");
      closeModal();
      navigate("/dashboard");
    } else {
      console.log("Error connecting user");
      setError("Password or email invalid");
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-xl flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-slate-100 dark:bg-slate-700 dark:text-slate-200 p-8 rounded-lg w-96 max-sm:mx-5"
      >
        <div className="flex justify-between">
          <h2 className="text-xl mb-4">Login</h2>
          <XMarkIcon className="size-6 cursor-pointer" onClick={closeModal} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded mt-2 outline-purple-600 dark:outline-slate-200"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
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
            className="w-full flex justify-center items-center bg-purple-700 text-white p-2 rounded-lg hover:bg-purple-600 hover:ring-1 hover:ring-purple-500"
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
        </form>
        {error && <ToastError content={error} />}

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
