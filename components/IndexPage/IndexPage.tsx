import React from "react";
import Card from "./Card";
import { IndexProps } from "pages";
import { Transition } from "@tailwindui/react";

function BackgroundImage({ url }: { url: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        alt="image of mars"
        src={url}
        className="object-cover min-w-full min-h-full"
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

function Content({ card1, card2, primaryText }: IndexProps) {
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
        <CallToAction>{primaryText}</CallToAction>
      </div>
      <div className="z-20 flex justify-end transform sm:translate-y-8 lg:translate-x-8">
        <Card
          title={card1.title}
          body={card1.body}
          mobileBookImage={card1.mobileBookImage}
        />
      </div>
      <div className="hidden sm:block">
        <CallToAction>{primaryText}</CallToAction>
      </div>
      <div className="z-20 transform sm:-translate-y-8 lg:-translate-x-8">
        <Card
          title={card2.title}
          body={card2.body}
          mobileBookImage={card2.mobileBookImage}
        />
      </div>
    </Transition>
  );
}

function IndexPage(props: IndexProps) {
  return (
    <div className="relative flex flex-col items-center justify-center flex-1">
      <Transition
        appear
        show
        enter="transition-opacity duration-1000 ease-in"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <BackgroundImage url="https://scx2.b-cdn.net/gfx/news/hires/2019/3-mars.jpg" />
      </Transition>
      <Content {...props} />
    </div>
  );
}

export default IndexPage;
