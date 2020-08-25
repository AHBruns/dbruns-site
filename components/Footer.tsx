import React from "react";

function Footer() {
  return (
    <footer
      className="relative z-20 bg-white bg-opacity-25"
      style={{
        backdropFilter: "blur(5px)",
      }}
    >
      <p className="p-4 text-sm leading-tight tracking-wider text-center text-gray-800 ">
        David Bruns, 2020.
      </p>
    </footer>
  );
}

export default Footer;
