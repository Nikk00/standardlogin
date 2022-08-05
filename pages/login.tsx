import type { NextPage } from "next";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";
import { BsToggleOn, BsToggleOff, BsMoonFill, BsSun } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";

const Login: NextPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 font-sans bg-white dark:bg-slate-800">
      <div className="flex items-center">
        <p className="mr-1 font-bold text-gray-600 dark:text-white">
          Dark Mode{" "}
        </p>
        <button className="w-8 h-8" onClick={handleClick}>
          {darkMode ? (
            <BsToggleOn className="w-8 h-8 text-gray-500" />
          ) : (
            <BsToggleOff className="w-8 h-8 text-gray-500" />
          )}{" "}
        </button>
      </div>
      <div className="grid w-96 h-1/2 bg-white dark:bg-slate-800 border-solid rounded-lg border-slate-200 border-2 p-10">
        <p className="text-gray-600 text-md font-bold dark:text-white text-lg">
          Login
        </p>
        <br></br>
        <form>
          <div className="relative flex items-center">
            <MdEmail className="w-5 h-5 absolute ml-2 mb-2 text-gray-500 pointer-events-none" />
            <input
              className="w-full h-10 py-2 pl-8 pr-3 border-slate-200 rounded-md border-2 mb-2"
              type="email"
              placeholder="Email"
            ></input>
          </div>
          <div className="relative flex items-center">
            <RiLockPasswordFill className="w-5 h-5 absolute ml-2 mb-2 text-gray-500 pointer-events-none " />
            <input
              className="w-full h-10 py-2 pl-8 pr-3 mb-2 border-slate-200 rounded-md border-2"
              type="password"
              placeholder="Password"
            ></input>
          </div>
        </form>
        <Link href="/personalinfo">
          <button className="w-full bg-blue-600 rounded-md border-1 h-8 text-white font-bold">
            Login
          </button>
        </Link>
        <br></br>
        <h1 className="text-center text-slate-400 text-sm mt-2">
          or continue with these social profile
        </h1>
        <br></br>
        <div className="flex justify-center m-1">
          <a
            className="w-8 h-8 rounded-full border-slate-400 border-2 mr-2"
            href=""
          >
            <FaGoogle className="text-gray-600 absolute ml-1.5 mt-1" />
          </a>
          <a
            className="w-8 h-8 rounded-full border-slate-400 border-2 mr-2"
            href=""
          >
            <IoLogoFacebook className="text-gray-600 absolute ml-1.5 mt-1" />
          </a>
          <a
            className="w-8 h-8 rounded-full border-slate-400 border-2 mr-2"
            href=""
          >
            <FaTwitter className="text-gray-600 absolute ml-1.5 mt-1" />
          </a>
          <a
            className="w-8 h-8 rounded-full border-slate-400 border-2 mr-2"
            href=""
          >
            <FaGithub className="text-gray-600 absolute ml-1.5 mt-1" />
          </a>
        </div>
        <br></br>
        <p className="text-slate-400 text-center">
          Don't have an account yet?{" "}
          <a className="text-sky-500" href="/">
            Register
          </a>
        </p>
      </div>
      <p className="text-slate-400">created by</p>
    </div>
  );
};

export default Login;
