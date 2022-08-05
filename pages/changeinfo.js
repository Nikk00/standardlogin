/* import type { NextPage } from "next"; */
import Nav from "../components/nav";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/avatar.png";
import { IoChevronBack } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";
import React, { useState, useEffect } from "react";

const Changeinfo = ({data}) => {

  useEffect( ()=>{
    
  },[])
  const [fileItem, setFile] = useState(null);

  const handleChangeImg = (e) => {

    console.log(e.target.files);
    if (e.target.files.length != 0) {
      var image = URL.createObjectURL(e.target.files[0])
      setFile(image);
    } else {
      setFile(logo);
    }
  }
  const [changeUser, setchangeUser] = useState({
    email: "",
    password: "",
    bio: "",
    phone: "",

  });
  /* const handleChange = (e) =>
  setchangeUser({ ...newUser, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newUser);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    await createUser();
  };
  const createUser = async () => {
    console.log(newUser);
    try {
      await fetch("http://localhost:3000/api/users/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      router.push("/personalinfo");
    } catch (error) {
      console.error(error);
    }
  }; */
  return (
    <div className="font-sans bg-white dark:bg-slate-800">
      <Nav />
      <div className="flex flex-col items-center">
        <div className="flex justify-items-start mb-4">
          <Link href="/personalinfo">
            <a className="text-sky-500">
              <IoChevronBack className="inline-block" /> Back
            </a>
          </Link>
        </div>

        <div className="grid w-1/2 h-1/2 grid-rows-7 bg-white dark:bg-slate-800 border-solid rounded-lg border-slate-200 border-2">
          <div>
            <div className="grid grid-cols-2 pb-4 px-7 pt-4">
              <div>
                <p className="font-semibold text-xl">Change Info</p>
                <p>Changes will be reflected to every services</p>
              </div>
            </div>
          </div>
          <form>
            <div>
              <div className="grid">
                <div className="pb-4 px-7">
                  <p className="text-gray-400">CHANGE PHOTO</p>
                </div>
                <div className="grid place-content-center justify-start px-7">
                  <label className="relative" htmlFor="firstimg">
                    <AiFillCamera className="top-8 right-8 w-8 h-8 absolute z-10 text-white"></AiFillCamera>
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    id="firstimg"
                    onChange={handleChangeImg}
                  />
                  <Image
                    src={fileItem ? fileItem : logo}
                    className="rounded-md"
                    width={100}
                    height={100}
                    layout="fixed"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="pt-2 px-7">
                <div>
                  <p className="text-black">Name</p>
                </div>
                <div className="grid place-content-center justify-start">
                  <input
                    className="w-96 h-8 rounded-lg border-2 p-2"
                    placeholder="Enter your name..."
                    name="nombre"
                  ></input>
                </div>
              </div>
            </div>
            <div className="">
              <div className="pt-2 px-7">
                <div>
                  <p className="text-black">Bio</p>
                </div>
                <div className="grid justify-start">
                  <textarea
                    className="w-96 h-20 rounded-lg border-2 p-2"
                    placeholder="Enter your Bio..."
                    name="bio"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="">
              <div className="pt-2 px-7">
                <div>
                  <p className="text-black">Phone</p>
                </div>
                <div className="grid place-content-center justify-start">
                  <input
                    className="w-96 h-8 rounded-lg border-2 p-2"
                    placeholder="Enter your Phone..."
                    name="phone"
                  ></input>
                </div>
              </div>
            </div>
            <div className="">
              <div className="pt-2 px-7">
                <div>
                  <p className="text-black">Email</p>
                </div>
                <div className="grid place-content-center justify-start">
                  <input
                    className="w-96 h-8 rounded-lg border-2 p-2"
                    placeholder="Enter your Email..."
                    name="email"
                  ></input>
                  {data.email}
                </div>
              </div>
            </div>
            <div className="">
              <div className="pt-2 px-7 mb-2">
                <div>
                  <p className="text-black">Password</p>
                </div>
                <div className="grid place-content-center justify-start">
                  <input
                    type="password"
                    className="w-96 h-8 rounded-lg border-2 p-2"
                    placeholder="Enter your new Password..."
                    name="password"
                  ></input>
                  {data.password}
                </div>
              </div>
            </div>
          <button className="mx-7 mb-4 w-24 bg-blue-600 rounded-md border-1 h-8 text-white font-bold">
            Save
          </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://localhost:3000/api/users/`+id)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
export default Changeinfo;
