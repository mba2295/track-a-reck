"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PiBug } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";
interface LinkModel {
  text: string;
  url: string;
}
const Navbar = () => {
  const path = usePathname();
  const [nav, setNav] = useState(false);
  // Array containing navigation items
  const links: LinkModel[] = [
    { text: "Dashboard", url: "/" },
    { text: "Tickets", url: "/tickets" },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-black bg-[#bdee63] nav">
      {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
      <div className="sm:text-4xl md:text-5xl font-signature ml-2">
        <Link
          className="flex link-underline link-underline-black"
          href="/"
          rel="noreferrer"
        >
          <PiBug></PiBug>
          Track a Reck
        </Link>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ text, url }) => (
          <li
            key={url}
            className={classNames({
              "nav-link px-4 cursor-pointer capitalize  hover:scale-105 hover:text-white duration-200 link-underline":
                true,
              "font-medium text-gray-500": path !== url,
              "font-bold text-black-500": path === url,
            })}
          >
            <Link href={url}>{text}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className={classNames({
          "cursor-pointer pr-4 z-10 text-gray-500 md:hidden": true,
        })}
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ text, url }) => (
            <li
              key={url}
              className={classNames({
                "px-4 cursor-pointer capitalize  hover:scale-105 hover:text-white duration-200 link-underline":
                  true,
                "font-medium text-gray-500": path !== url,
                "font-bold text-black-500": path === url,
              })}
            >
              <Link onClick={() => setNav(!nav)} href={url}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
