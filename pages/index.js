/* import type { NextPage } from "next"; */
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react"
import Axios from "axios";
import swal from '@sweetalert/with-react';
const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const { data: session } = useSession()
  //console.log(session)
  if(session){
    for(var i= 0; i<1 ;i++){
      
      /* Axios.get(`/api/users/${session.user.email}`)
      .then((res) => {
        console.log(res)
        const profile = {
          _id: res.data[0]._id
        }
        console.log(profile)
        Axios.post(`/api/profile/profile`,
              JSON.stringify(profile),
              { headers: { "Content-Type": "application/json" } }
              )
             .then((res) => {
                if(res.status == 200){
                  swal("Ingreso Exitoso!", "You clicked the button!", "success");
                  router.push({pathname: '/changeinfo', query: {email: session.user.email} });
              }
               console.log(res)})
              .catch((e) => {
                console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      }); */
    }
  }

  const handleClick = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };
  const [newUser, setNewUser] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    console.log(newUser);
    var ver = verifyUser()
    console.log(ver)
    if(ver == 1){
      await createUser();
    }else{
      alert("Error al ingresar el email")
    }
  }
  const createUser = async () => {
    await fetch("/api/users/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }).then((response)=>{
        console.log(response.status)
        if(response.status == 200){
          swal("Ingreso Exitoso!", "You clicked the button!", "success");
          router.push({pathname: '/changeinfo', query: {email: newUser.email} });
        }
      }).catch( (e) =>{
        console.log(e)
      })
  }
  const verifyUser = () =>{
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (expr.test(newUser.email)){
      return 1
    }else{
      return 0
    }
  }
  return (
    <>
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
        <p className="text-gray-600 text-md font-bold dark:text-white">
          Join thousands of learners from around the world
        </p>
        <br></br>
        <p className="text-black text-sm dark:text-white">
          Master web development by making real-life projects. There are
          multiple paths for you to choose.
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
          type="submit">
          Start coding now
          </button>
        </form>

        <h1 className="text-center text-slate-400 text-sm mt-2">
          or continue with these social profile
        </h1>
        <div className="flex justify-center m-1">
          <button
            onClick={() => signIn("github")}
            className="w-8 h-8 rounded-full border-slate-400 border-2 mr-2 grid place-content-center" data-modal-toggle="authentication-modal">
            <FaGithub className="text-gray-600 dark:text-white" />
          </button>
          <button
            onClick={() => signIn("google")}
            className="w-8 h-8 rounded-full border-slate-400 border-2 mr-2 grid place-content-center" data-modal-toggle="authentication-modal">
            <FaGoogle className="text-gray-600 dark:text-white" />
          </button>
          <button 
            onClick={() => signIn("facebook")}
            className="w-8 h-8 rounded-full border-slate-400 border-2 mr-2 grid place-content-center" data-modal-toggle="authentication-modal">
            <IoLogoFacebook className="text-gray-600 dark:text-white" />
          </button>
        </div>
        <p className="text-slate-400 text-center">
          already a member?{" "}
          <a className="text-sky-500" href="/login">
            Login
          </a>
        </p>
      </div>
      <p className="text-slate-400">created by</p>
    </div>
      <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      <span className="sr-only">Close modal</span>
                  </button>
                  <div className="py-6 px-6 lg:px-8">
                      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                      <form className="space-y-6" action="#">
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                          </div>
                          <div className="flex justify-between">
                              <div className="flex items-start">
                                  <div className="flex items-center h-5">
                                      <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                  </div>
                                  <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                              </div>
                              <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                          </div>
                          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                              Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div> 
      </>
  );
};

export default Home;
