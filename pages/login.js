/* import type { NextPage } from "next"; */
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";
import { BsToggleOn, BsToggleOff, BsMoonFill, BsSun } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import Axios from "axios";
import swal from '@sweetalert/with-react';

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };
  const { data: session } = useSession();
  //console.log(session)
  if (session) {
    for (var i = 0; i < 1; i++) {
      Axios.get(`${process.env.NEXTAUTH_URL}api/users/${session.user.email}`)
        .then((res) => {
          console.log(res);
          const profile = {
            _id: res.data[0]._id,
          };
          console.log(profile);
          Axios.get(`${process.env.NEXTAUTH_URL}api/users/${res.data[0]._id}`)
            .then((res) => {
              if (res.status == 200) {
                swal("Ingreso Exitoso!", "You clicked the button!", "success");
                router.push({
                  pathname: "/changeinfo",
                  query: { email: session.user.email },
                });
              }
              if (res.status == 201) {
                Axios.post(
                  `${process.env.NEXTAUTH_URL}api/profile/profile`,
                  JSON.stringify(profile),
                  { headers: { "Content-Type": "application/json" } }
                )
                  .then((res) => {
                    if (res.status == 200) {
                      swal("Ingreso Exitoso!", "You clicked the button!", "success");
                      router.push({
                        pathname: "/changeinfo",
                        query: { email: session.user.email },
                      });
                    }
                    console.log(res);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    var user = {
      email: newUser.email,
      password: newUser.password,
    };
    console.log(user);
    await foundUser(user);
  };
  const foundUser = async (data) => {
    await fetch(`${process.env.NEXTAUTH_URL}api/users/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          swal("Ingreso Exitoso!", "You clicked the button!", "success");
          router.push({
            pathname: "/personalinfo",
            query: { email: newUser.email },
          });
        }else{
          swal("Credenciales Invalidas", "You clicked the button!", "error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
      <div className="grid w-full h-full lg:w-96 lg:h-1/2 md:w-96 md:h-1/2 bg-white dark:bg-slate-800 lg:border-solid md:border-solid rounded-lg border-slate-200 border-2 p-10 border-hidden ">
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
              name="email"
              onChange={handleChange}
            ></input>
          </div>
          <div className="relative flex items-center">
            <RiLockPasswordFill className="w-5 h-5 absolute ml-2 mb-2 text-gray-500 pointer-events-none " />
            <input
              className="w-full h-10 py-2 pl-8 pr-3 mb-2 border-slate-200 rounded-md border-2"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            ></input>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 rounded-md border-1 h-8 text-white font-bold"
          >
            Login
          </button>
        </form>
        <br></br>
        <h1 className="text-center text-slate-400 text-sm mt-2">
          or continue with these social profile
        </h1>
        <br></br>
        <div className="flex justify-center m-1">
          <button
            onClick={() => signIn("github")}
            className="w-8 h-8 rounded-full border-slate-400 border-2 mr-2 grid place-content-center"
          >
            <FaGithub className="text-gray-600 dark:text-white" />
          </button>
          <button
            onClick={() => signIn("google")}
            className="w-8 h-8 rounded-full border-slate-400 border-2 mr-2 grid place-content-center"
          >
            <FaGoogle className="text-gray-600 dark:text-white" />
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="w-8 h-8 rounded-full border-slate-400 border-2 mr-2 grid place-content-center"
          >
            <IoLogoFacebook className="text-gray-600 dark:text-white" />
          </button>
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
