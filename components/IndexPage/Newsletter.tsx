import React from "react";
import ThreeDimensionalBook from "components/3DBook";
import Button from "components/Button";
import { Transition } from "@tailwindui/react";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import { ImageGroup } from "lib/cmsUtils";

export interface NewsletterProps {
  title: string;
  body: STRINGIFIED_HTML;
  mobileBookImage: ImageGroup;
}

function Newsletter({ title, body, mobileBookImage }: NewsletterProps) {
  return (
    <Transition
      appear
      show
      enter="transition-all transform ease-in-out duration-500 delay-500"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      className="relative max-w-screen-sm p-4 space-y-4 bg-white rounded-sm shadow-lg sm:bg-gray-800 sm:bg-opacity-50 sm:max-w-lg BACKDROP_BLUR"
    >
      <h1 className="text-xl font-bold leading-tight tracking-wider text-center text-gray-800 uppercase sm:text-white sm:text-left">
        {title}
      </h1>
      <div className="block sm:hidden">
        <ThreeDimensionalBook
          lazyLoad
          alt={mobileBookImage.alt}
          src={mobileBookImage.mobile.url}
          height={mobileBookImage.mobile.height}
          width={mobileBookImage.mobile.width}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: body }}
        className="space-y-4 font-normal tracking-wider text-gray-800 sm:font-light sm:text-white"
      />

      <div className="flex flex-row space-x-4">
        <label className="flex flex-col flex-1 space-y-1">
          <p className="text-sm font-semibold tracking-wider text-white">
            Your email
          </p>
          <input
            id={`email-input-${title.split(" ").join("-")}`}
            className="flex-1 px-3 py-2 text-white bg-gray-800 rounded-sm shadow-lg sm:text-gray-800 sm:bg-white focus:outline-none focus:shadow-outline-gray"
            placeholder="john.doe@gmail.com"
          />
        </label>
        <Button
          alt="submit email"
          className="self-end px-3 py-2 font-semibold tracking-wider text-white bg-gray-800 rounded-sm shadow-lg focus:outline-none focus:shadow-outline-gray hover:bg-gray-700"
        >
          Submit
        </Button>
      </div>
    </Transition>
  );
}

export default Newsletter;
