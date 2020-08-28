import React, { useState } from "react";
import Link from "next/link";
import { Transition } from "@tailwindui/react";

const HEADER_DATA = [
  { href: "/books", text: "Books" },
  { href: "/about", text: "About" },
  { href: "/", text: "Newsletters" },
  { href: "/contact", text: "Contact" },
];

function DavidBruns() {
  return (
    <Link href="/">
      <a className="focus:outline-none focus:underline">
        <h1 className="text-xl font-bold leading-tight tracking-widest text-gray-700 cursor-pointer hover:text-gray-900">
          David Bruns
        </h1>
      </a>
    </Link>
  );
}

function DesktopHeader() {
  return (
    <>
      <div className="z-50 flex items-center justify-between bg-white bg-opacity-50 BACKDROP_BLUR">
        <div className="p-4">
          <DavidBruns />
        </div>
        <nav className="flex items-center p-4 space-x-4">
          {HEADER_DATA.map(({ href, text }) => (
            <Link href={href} key={text}>
              <a className="leading-tight tracking-wider text-gray-700 uppercase focus:outline-none focus:underline hover:text-gray-900">
                {text}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 menu-alt4">
      <path
        fillRule="evenodd"
        d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ExitIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-12 h-12 x">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MobileBar({ handleOpenMenu }: { handleOpenMenu: () => void }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-200 bg-opacity-50 BACKDROP_BLUR">
      <DavidBruns />
      <button
        aria-label="open menu"
        onClick={handleOpenMenu}
        className="p-1 text-gray-700 rounded-sm focus:outline-none focus:underline focus:shadow-outline-gray"
      >
        <MenuIcon />
      </button>
    </div>
  );
}

function MobileMenu({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  return (
    <Transition
      className="fixed inset-0 top-0 z-50 flex flex-col items-center justify-center p-8 space-y-8 transition duration-700 ease-in-out transform bg-white"
      show={isOpen}
      enter="transition-all duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition-all duration-150"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <button
        aria-label="close menu"
        onClick={handleClose}
        className="p-1 text-gray-800 rounded-sm focus:outline-none focus:shadow-outline-gray"
      >
        <ExitIcon />
      </button>
      <ul className="space-y-4 text-4xl leading-tight tracking-widest text-center text-gray-800 uppercase">
        {HEADER_DATA.map(({ href, text }) => (
          <li onClick={handleClose} key={text}>
            <Link href={href}>
              <a className="focus:outline-none focus:underline">{text}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Transition>
  );
}

function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <MobileBar handleOpenMenu={() => setIsOpen(true)} />
      <MobileMenu isOpen={isOpen} handleClose={() => setIsOpen(false)} />
    </div>
  );
}

function Header() {
  return (
    <>
      <header className="bg-opacity-50">
        <div className="hidden sm:block">
          <DesktopHeader />
        </div>
        <div className="block sm:hidden">
          <MobileHeader />
        </div>
      </header>
    </>
  );
}

export default Header;
