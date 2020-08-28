import React from "react";
import ThreeDimensionalBook from "components/3DBook";
import Button from "components/Button";
import { IndexCardProps } from "pages";
import { Transition } from "@tailwindui/react";

function Card({ title, body, mobileBookImage }: IndexCardProps) {
  return (
    <Transition
      appear
      show
      enter="transition-all transform ease-in-out duration-500 delay-500"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      className="relative max-w-screen-sm p-4 space-y-4 bg-gray-800 bg-opacity-50 rounded-sm shadow-lg sm:max-w-lg BACKDROP_BLUR"
    >
      <h1 className="text-xl font-bold leading-tight tracking-wider text-center text-white uppercase sm:text-left">
        {title}
      </h1>
      <div className="block sm:hidden">
        <ThreeDimensionalBook
          src={mobileBookImage.url}
          height={mobileBookImage.height}
          width={mobileBookImage.width}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: body }}
        className="space-y-4 font-light tracking-wider text-white"
      />
      <div className="flex flex-row space-x-4">
        <input
          className="flex-1 px-3 py-2 text-gray-800 bg-white rounded-sm shadow-lg focus:outline-none focus:shadow-outline-gray"
          placeholder="john.doe@gmail.com"
        />
        <Button className="px-3 py-2 font-semibold tracking-wider text-white bg-gray-800 rounded-sm shadow-lg focus:outline-none focus:shadow-outline-gray hover:bg-gray-700">
          Submit
        </Button>
      </div>
    </Transition>
  );
}

export default Card;
