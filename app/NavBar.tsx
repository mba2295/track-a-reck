"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import logoPic from "@/public/Track A Reck-logos_transparent.png";
import Skeleton from "@/app/components/Skeleton";
interface LinkModel {
  text: string;
  url: string;
}
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const path = usePathname();
  // Array containing navigation items
  const links: LinkModel[] = [
    { text: "Dashboard", url: "/" },
    { text: "Tickets", url: "/tickets" },
  ];
  const handleSetNav = (nav: boolean) => {
    setNav(nav);
  };
  return (
    <nav className="w-full p-1 h-18 text-black bg-[#bdee63]">
      <Container>
        <Flex align="center" justify="between">
          <Link href="/" rel="noreferrer">
            <Image
              width={60}
              height={60}
              src={logoPic}
              alt="Track a reck"
            ></Image>
          </Link>

          <Flex className="px-4" direction="row" align="center" gap="2">
            <DesktopLinks links={links} path={path}></DesktopLinks>
          </Flex>

          <div
            onClick={() => setNav(!nav)}
            className={classNames({
              "cursor-pointer pr-4 z-10 text-gray-500 md:hidden": true,
            })}
          >
            {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
        </Flex>
      </Container>
      {nav && (
        <MobileLinks
          links={links}
          nav={nav}
          path={path}
          handleSetNav={handleSetNav}
        ></MobileLinks>
      )}
    </nav>
  );
};

const AuthUserProfileLogo = () => {
  const { status: status, data: session } = useSession();
  debugger;
  switch (status) {
    case "loading":
      return <Skeleton width="3rem"></Skeleton>;
    case "unauthenticated":
      return (
        <Box>
          <Link href="/api/auth/signin">Sign in</Link>
        </Box>
      );
    case "authenticated":
      return (
        <Box>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session?.user?.image || ""}
                fallback="A"
                radius="full"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <DropdownMenu.Label>
                  <Text>{session?.user!.email}</Text>
                </DropdownMenu.Label>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                <span
                  className={classNames({
                    "nav-link px-4 cursor-pointer capitalize  hover:scale-105 hover:text-white duration-200 link-underline":
                      true,
                    "font-bold text-black-500": true,
                  })}
                >
                  <Link href="/api/auth/signout">Sign out</Link>
                </span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
      );

    default:
      break;
  }
};

export const DesktopLinks = ({
  links,
  path,
}: {
  links: LinkModel[];
  path: string;
}) => {
  return (
    <ul className="hidden md:flex items-center">
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
      <li>
        <AuthUserProfileLogo></AuthUserProfileLogo>
      </li>
    </ul>
  );
};

export const MobileLinks = ({
  links,
  path,
  nav,
  handleSetNav,
}: {
  links: LinkModel[];
  path: string;
  nav: boolean;
  handleSetNav: (params: any) => any;
}) => {
  const setNav = (nav: boolean) => {
    debugger;
    handleSetNav(nav);
  };
  return (
    <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
      <li>
        <AuthUserProfileLogo></AuthUserProfileLogo>
      </li>
      <br />
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
  );
};

export default Navbar;
