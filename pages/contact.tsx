import React from "react";
import Button from "components/Button";
import { Transition } from "@tailwindui/react";
import Head from "next/head";
import {
  fetchJSON,
  prependBaseURL,
  extractImage,
  ImageGroup,
} from "lib/cmsUtils";

interface ContactProps {
  headerText: string;
  backgroundImageGroup: ImageGroup;
}

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
      <img
        loading="lazy"
        alt={imageGroup.alt ?? "mobile background image"}
        src={imageGroup.mobile.url}
        className="block object-cover min-w-full min-h-full sm:hidden"
        height={imageGroup.mobile.height}
        width={imageGroup.mobile.width}
      />
    </div>
  );
}

function Contact({ headerText, backgroundImageGroup }: ContactProps) {
  return (
    <>
      <Head>
        <title>Contact · David Bruns</title>
        <meta name="description" content="David Bruns' contact page." />
      </Head>
      <div className="relative flex flex-col items-center justify-center flex-1 p-4">
        <BackgroundImage imageGroup={backgroundImageGroup} />
        <Transition
          appear
          show
          enter="transition-all ease-in-out duration-300 delay-200"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          className="z-10 flex flex-col w-full max-w-md p-4 space-y-4 transform bg-white rounded-sm shadow-lg"
        >
          <h1 className="text-3xl font-bold leading-tight tracking-wider text-gray-800 uppercase">
            {headerText}
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
    </>
  );
}

export async function getStaticProps(): Promise<{
  props: ContactProps;
  revalidate: number;
}> {
  const data = await fetchJSON(prependBaseURL({ endpoint: "/contact-page" }));

  return {
    props: {
      headerText: data.form_header_text,
      backgroundImageGroup: extractImage({ cmsImage: data.background_image }),
    },
    revalidate: 15,
  };
}

export default Contact;
