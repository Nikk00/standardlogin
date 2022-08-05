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
import logo from "/public/avatar.png";
import Image from "next/image";
import { getSession } from "next-auth/react";

const Nav = ({ session }) => {
  const [showItem, setshowItem] = useState(false);
  const handleClick = () => {
    setshowItem(!showItem);
  };
  return (
    <nav className="flex flex-col mr-24 mt-6">
      <div className="flex justify-end items-center">
        <button className="flex items-center" onClick={handleClick}>
          <Image
            src={logo}
            className="rounded-md"
            width={38}
            height={38}
            alt=""
          />
          <p className="font-bold pl-2 text-gray-600">Xanthe Neal</p>
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
            <Link href="/">
              <a>
                <FaUserCircle className="inline-block mr-3" />
                My Profile
              </a>
            </Link>
          </li>
          <li className="mt-2 mb-2 hover:bg-slate-200 rounded-md p-1 font-semibold text-slate-700">
            <Link href="/">
              <a>
                <MdGroup className="inline-block mr-3" />
                Group Chat
              </a>
            </Link>
          </li>
          <hr></hr>
          <li className="mt-2 rounded-md p-1 font-semibold text-red-400 hover:bg-slate-200">
            <Link href="/api/auth/signout">
              <a>
                <RiLogoutBoxRLine className="inline-block mr-3" />
                Logout
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: { session },
  };
};
export default Nav;
