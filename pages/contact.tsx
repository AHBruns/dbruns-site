import React from "react";
import Button from "components/Button";
import { Transition } from "@tailwindui/react";
import Head from "next/head";

function Contact() {
  return (
    <>
      <Head>
        <title>Contact · David Bruns</title>
        <meta name="description" content="Contact David Bruns." />
      </Head>
      <div className="relative flex-1">
        <div className="absolute inset-0 overflow-y-auto bg-gray-800">
          <div className="absolute inset-0 flex flex-col items-center p-4 md:justify-center">
            <Transition
              appear
              show
              enter="transition-all ease-in-out duration-300 delay-200"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              className="z-10 flex flex-col w-full max-w-md p-4 space-y-4 transform bg-white rounded-sm shadow-lg"
            >
              <h1 className="text-3xl font-bold leading-tight tracking-wider text-gray-800 uppercase">
                Let's talk
              </h1>
              <input
                className="px-3 py-2 text-white bg-gray-800 rounded-sm shadow-lg focus:shadow-outline-gray focus:outline-none"
                placeholder="your email"
              />
              <textarea
                placeholder="your message"
                className="px-3 py-2 text-white bg-gray-800 rounded-sm shadow-lg focus:shadow-outline-gray h-52 max-h-96 focus:outline-none"
              ></textarea>
              <Button
                alt="send message"
                className="px-3 py-2 space-x-2 font-semibold tracking-wider text-white bg-gray-800 rounded-sm shadow-md focus:shadow-outline-gray focus:outline-none hover:bg-gray-700"
              >
                Submit
              </Button>
            </Transition>
          </div>
        </div>
      </div>
    </>

    // <div className="relative flex flex-col justify-between min-h-screen">
    //   <main
    //     className="flex items-center justify-center flex-1 w-full"
    //     style={{
    // background:
    //   "url('https://photojournal.jpl.nasa.gov/jpeg/PIA22906.jpg')",
    // backgroundPosition: "bottom",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
    //     }}
    //   >
    // <div className="flex items-center justify-center w-full max-w-2xl p-4">
    //   <div className="flex flex-col w-full max-w-md p-4 space-y-4 bg-white rounded-sm shadow-lg">
    //     <h1 className="text-3xl font-bold leading-tight tracking-wider text-gray-800 uppercase">
    //       Let's talk
    //     </h1>
    //     <input
    //       className="px-3 py-2 text-white bg-gray-800 rounded-sm shadow-lg focus:shadow-outline-gray focus:outline-none"
    //       placeholder="your email"
    //     />
    //     <textarea
    //       placeholder="your message"
    //       className="px-3 py-2 text-white bg-gray-800 rounded-sm shadow-lg focus:shadow-outline-gray h-52 max-h-96 focus:outline-none"
    //     ></textarea>
    //     <Button className="px-3 py-2 space-x-2 font-semibold tracking-wider text-white bg-gray-800 rounded-sm shadow-md focus:shadow-outline-gray focus:outline-none hover:bg-gray-700">
    //       Submit
    //     </Button>
    //   </div>
    // </div>
    //   </main>
    // </div>
  );
}

export default Contact;
