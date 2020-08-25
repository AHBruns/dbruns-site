import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const HEADER_DATA = [
  { href: "/books", text: "Books" },
  { href: "/about", text: "About" },
  { href: "/", text: "Newsletters" },
  { href: "/contact", text: "Contact" },
];

function HeaderLink({
  href,
  children,
  mobile,
}: {
  href: string;
  children: string | string[];
  mobile?: boolean;
}) {
  return (
    <Link href={href}>
      <a className={`${mobile ? "block mt-4" : ""}`}>
        <li
          className={`px-2 py-1 focus:outline-none ${
            mobile ? "bg-gray-700" : "hover:underline"
          }`}
          style={{
            textDecorationSkip: "ink",
          }}
        >
          {children}
        </li>
        <style jsx>{`
          li {
            text-decoration-thickness: 25px;
          }
        `}</style>
      </a>
    </Link>
  );
}

const opaqueOn = ["/"];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header
      className={`sticky top-0 z-30 bg-white ${
        opaqueOn.includes(router.asPath) ? "bg-opacity-100" : "bg-opacity-50"
      }`}
      style={{
        backdropFilter: "blur(5px)",
      }}
    >
      <nav>
        <div className="items-baseline justify-between hidden p-4 sm:flex">
          <Link href="/">
            <a>
              <h1 className="text-xl font-bold leading-tight tracking-widest text-gray-800">
                David Bruns
              </h1>
            </a>
          </Link>
          <ul className="justify-center hidden space-x-4 text-gray-800 sm:flex">
            {HEADER_DATA.map(({ href, text }) => (
              <HeaderLink href={href} key={href}>
                {text}
              </HeaderLink>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="fixed inset-x-0 top-0 z-10 flex justify-end w-full p-4 text-white bg-gray-800 shadow-lg sm:hidden focus:outline-none"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8 p-1 bg-gray-700 rounded-md menu"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="block h-16 sm:hidden" />
        <div
          className={`fixed inset-x-0 top-0 z-10 p-4 bg-gray-800 shadow-lg sm:hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute p-1 text-white bg-gray-700 rounded-md focus:outline-none right-4 sfocus:outline-none"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 x">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <ul className="pt-8 space-y-4 text-white">
            {HEADER_DATA.map(({ href, text }) => (
              <HeaderLink href={href} key={href} mobile>
                {text}
              </HeaderLink>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
