import React from "react";
import Newsletter, { NewsletterProps } from "./Newsletter";
import { IndexProps } from "pages";
import { Transition } from "@tailwindui/react";
import { ImageGroup } from "lib/cmsUtils";

function BackgroundImage({ imageGroup }: { imageGroup: ImageGroup }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-800">
      <img
        loading="lazy"
        alt={imageGroup.alt ?? "desktop background image"}
        src={imageGroup.desktop.url}
        className="hidden object-cover min-w-full min-h-full sm:block"
        height={imageGroup.desktop.height}
        width={imageGroup.desktop.width}
      />
    </div>
  );
}

function CallToAction({ children }: { children: string }) {
  return (
    <h1 className="relative z-10 block max-w-5xl p-6 text-3xl font-bold leading-tight tracking-wider text-center text-gray-800 uppercase bg-white rounded-sm shadow-lg sm:text-5xl sm:px-8 sm:py-12">
      {children}
    </h1>
  );
}

function Content({
  callToAction,
  newsletter1,
  newsletter2,
}: {
  callToAction: string;
  newsletter1: NewsletterProps;
  newsletter2: NewsletterProps;
}) {
  return (
    <Transition
      appear
      show
      enter="transition-opacity duration-500 delay-200 ease-in-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="flex flex-col p-4 space-y-4 sm:space-y-0 sm:p-0"
    >
      <div className="block sm:hidden">
        <CallToAction>{callToAction}</CallToAction>
      </div>
      <div className="z-20 flex justify-end transform sm:translate-y-8 lg:translate-x-8">
        <Newsletter {...newsletter1} />
      </div>
      <div className="hidden sm:block">
        <CallToAction>{callToAction}</CallToAction>
      </div>
      <div className="z-20 transform sm:-translate-y-8 lg:-translate-x-8">
        <Newsletter {...newsletter2} />
      </div>
    </Transition>
  );
}

function IndexPage({ desktopBackgroundImage, ...rest }: IndexProps) {
  return (
    <div className="relative flex flex-col items-center justify-center flex-1">
      <BackgroundImage imageGroup={desktopBackgroundImage} />
      <Content {...rest} />
    </div>
  );
}

export default IndexPage;
