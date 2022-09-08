/* import type { NextPage } from "next"; */
import Link from "next/link";
import { useState } from "react";
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdGroup,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import logo from "/public/data/uploads/avatar.png";
import Image from "next/image";
import { signOut } from "next-auth/react"

const Nav = ( prop ) => {
  const [showItem, setshowItem] = useState(false);
  const handleClick = () => {
    setshowItem(!showItem);
  };
  return (
    <nav className="flex flex-col lg:mr-24 lg:mt-6 md:mr-24 md:mt-6 mt-2">
      <div className="flex justify-end items-center">
        <button className="flex items-center" onClick={handleClick}>
        {prop.img ? (
          <Image
          src={`/data/uploads/${prop.img}`}
          className="rounded-md"
          width={38}
          height={38}
          alt=""
          />
          ) : 
          (
            <Image
            src={logo}
            className="rounded-md"
            width={38}
            height={38}
            alt=""
            />
          )}
          <p className="font-bold pl-2 text-gray-600">{prop.name ? (<p>{prop.name}</p>) : (<p>New User</p>)}</p>
          <MdOutlineArrowDropDown className="m-2" />
        </button>
      </div>
      <div className="flex justify-end mt-1 mr-4">
        <ul
          className={`w-34 h-34 rounded-md border border-solid border-slate-200 bg-white pr-2 pl-2 pb-2 absolute ${
            showItem ? "visible" : "hidden"
          }`}
        >
          <li className="mt-2 hover:bg-slate-200 rounded-md p-1 font-semibold text-slate-700">
            <Link href={`/personalinfo?email=${prop.email}`}>
              <a>
                <FaUserCircle className="inline-block mr-3" />
                My Profile
              </a>
            </Link>
          </li>
          <li className="mt-2 mb-2 hover:bg-slate-200 rounded-md p-1 font-semibold text-slate-700">
            <Link href={`/changeinfo?email=${prop.email}`}>
              <a>
                <MdGroup className="inline-block mr-3" />
                Group Chat
              </a>
            </Link>
          </li>
          <hr></hr>
          <li className="mt-2 rounded-md p-1 font-semibold text-red-400 hover:bg-slate-200">
            <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })} >
              <a>
                <RiLogoutBoxRLine className="inline-block mr-3" />
                Logout
              </a>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Nav;
