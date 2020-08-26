import React from "react";
import Header from "components/Header";
import Button from "components/Button";

function Contact() {
  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      <Header />
      <main
        className="flex items-center justify-center flex-1 w-full"
        style={{
          background:
            "url('https://photojournal.jpl.nasa.gov/jpeg/PIA22906.jpg')",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex items-center justify-center w-full max-w-2xl p-4">
          <div className="flex flex-col w-full max-w-md p-4 space-y-4 bg-white shadow-lg">
            <h1 className="text-3xl font-bold leading-tight tracking-wider text-gray-800 uppercase">
              Let's talk
            </h1>
            <input
              className="px-3 py-2 text-white bg-gray-800 hadow-md /rounded-md focus:outline-none"
              placeholder="your email"
            />
            <textarea
              placeholder="your message"
              className="px-3 py-2 text-white bg-gray-800 shadow-md /rounded-md h-52 max-h-96 focus:outline-none"
            ></textarea>
            <Button className="px-3 py-2 space-x-2 font-semibold tracking-wider text-white bg-gray-800 shadow-md focus:outline-none hover:bg-gray-700">
              Submit
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact;
