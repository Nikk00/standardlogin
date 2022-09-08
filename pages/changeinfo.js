/* import type { NextPage } from "next"; */
import Nav from "../components/nav";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/data/uploads/avatar.png";
import { IoChevronBack } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Axios from "axios";
import swal from '@sweetalert/with-react';

const Changeinfo = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();
  //console.log(session)
  const [dataProfile, setDataProfile] = useState(null);
  const [isLoadingProf, setLoadingProfile] = useState(false);
  useEffect(() => {
    info();
    async function info() {
      console.log("query: " + router.query.email);
      Axios.get(`${process.env.NEXTAUTH_URL}api/users/${router.query.email}`)
        .then((res) => {
          console.log(res);
          setData(res.data[0]);
          setLoading(true);
          const getId = res.data[0]._id
          Axios.get(`${process.env.NEXTAUTH_URL}api/profile/${getId}`)
               .then((res) => {
                  console.log(res)
                  console.log(res.data);
                  setDataProfile(res.data);
                  setLoadingProfile(true);
                })
                .catch((e) => {
                  console.log(e);
                });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);
  const [fileItem, setFile] = useState(null);
  const [saveImg, setImg] = useState(logo);

  const handleChangeImg = async (e) => {
    setImg(e.target.files[0]);
    if (e.target.files.length != 0) {
      var image = URL.createObjectURL(e.target.files[0]);
      setFile(image);
    } else {
      /* console.log("imagen:" + logo); */
      setFile(logo);
    }
  };
  const [changeUser, setchangeUser] = useState({
    email: "",
    password: "",
  });
  const [changeProf, setchangeProfile] = useState({
    bio: "",
    phone: "",
    name: "",
  });
  const handleChangeUser = (e) =>
    setchangeUser({ ...changeUser, [e.target.name]: e.target.value });

  const handleChangeProfile = (e) =>
    setchangeProfile({ ...changeProf, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setchangeUser({ ...changeUser, [e.target.name]: e.target.value });
    setchangeProfile({ ...changeProf, [e.target.name]: e.target.value });

    const formData = new FormData();
    var contUser = 0;
    const user = {};
    const profile = {
      name: changeProf.name,
      bio: changeProf.bio,
      phone: changeProf.phone,
    };

    formData.append("myFile", saveImg);

    Object.entries(profile).forEach(([key, value]) => {
      if (value != "") {
        formData.append(`${key}`, value);
        console.log(formData.get(key));
      }
    });
    
    Object.entries(changeUser).forEach(([key, value]) => {
      if (value != "") {
        contUser++;
      }
    });
    await Axios.put(
      `${process.env.NEXTAUTH_URL}api/profile/${data._id}`,
      formData
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    
    console.log("ContadorUser:" + contUser);
    if (contUser == 2) {
      Object.entries(changeUser).forEach(([key, value]) => {
        if (value != "") {
          user[`${key}`] = value;
        }
      });
      console.log(user);
      await Axios.put(
        `${process.env.NEXTAUTH_URL}api/users/${data._id}`,
        JSON.stringify(user),
        { headers: { "Content-Type": "application/json" } }
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      swal("Cambio Exitoso!", "You clicked the button!", "success");
      router.push({
        pathname: "/personalinfo",
        query: { email: user.email },
      });
    } else {
      swal("Cambio Exitoso!", "You clicked the button!", "success");
      router.push({
        pathname: "/personalinfo",
        query: { email: router.query.email },
      });
    }
  };
  if (!isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  if (!isLoadingProf) return <p>Loading...</p>;
  if (!dataProfile) return <p>No profile data</p>;
  return (
    <div className="font-sans bg-white ">
      <Nav
      name={dataProfile.name ? dataProfile.name : 'User'}
      img={dataProfile.photo ? dataProfile.photo.name : null}
      email={router.query.email}
      />
      <div className="flex flex-col items-center">
        <div className="flex justify-items-start mb-4">
          <button
            onClick={() => {
              router.push({
                pathname: "/personalinfo",
                query: { email: router.query.email },
              });
            }}
            className="text-sky-500"
          >
            <IoChevronBack className="inline-block" /> Back
          </button>
        </div>

        <div className="grid w-full h-full lg:w-1/2 lg:h-1/2 md:w-1/2 md:h-1/2 grid-rows-7 bg-white  lg:border-solid md:border-solid rounded-lg border-slate-200 border-2 border-hidden">
          <div>
            <div className="grid grid-cols-2 pb-4 px-7 pt-4">
              <div>
                <p className="font-semibold text-xl">Change Info</p>
                <p>Changes will be reflected to every services</p>
              </div>
            </div>
          </div>
          <form>
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
                  accept="image/*"
                  id="firstimg"
                  name="myFile"
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
            <div className="pt-2 px-7">
              <div>
                <p className="text-black">Name</p>
              </div>
              <div className="grid place-content-center justify-start">
                <input
                  className="w-96 h-8 rounded-lg border-2 p-2"
                  placeholder={dataProfile.name ? dataProfile.name : ""}
                  name="name"
                  onChange={handleChangeProfile}
                ></input>
              </div>
            </div>
            <div className="pt-2 px-7">
              <div>
                <p className="text-black">Bio</p>
              </div>
              <div className="grid justify-start">
                <textarea
                  className="w-96 h-20 rounded-lg border-2 p-2"
                  name="bio"
                  onChange={handleChangeProfile}
                  placeholder={
                    dataProfile.bio ? dataProfile.bio : "Enter your Bio..."
                   }
                ></textarea>
              </div>
            </div>
            <div className="pt-2 px-7">
              <div>
                <p className="text-black">Phone</p>
              </div>
              <div className="grid place-content-center justify-start">
                <input
                  className="w-96 h-8 rounded-lg border-2 p-2"
                  name="phone"
                  onChange={handleChangeProfile}
                  placeholder={
                      dataProfile.phone
                        ? dataProfile.phone
                        : "Enter your Phone..."
                    }
                ></input>
              </div>
            </div>
            <div className="pt-2 px-7">
              <div>
                <p className="text-black">Email</p>
              </div>
              <div className="grid place-content-center justify-start">
                <input
                  className="w-96 h-8 rounded-lg border-2 p-2"
                  name="email"
                  onChange={handleChangeUser}
                  placeholder={
                      data ? data.email : "Enter your Email..."
                    }
                  required
                ></input>
              </div>
            </div>
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
                  onChange={handleChangeUser}
                  required
                ></input>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="mx-7 mb-4 w-24 bg-blue-600 rounded-md border-1 h-8 text-white font-bold"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Changeinfo;
