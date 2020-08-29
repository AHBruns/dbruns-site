import React, { useState, useEffect, useRef, RefObject } from "react";
import { ImageGroup } from "lib/cmsUtils";

interface ImgProps {
  url: string;
  alt?: string;
  height?: number;
  width?: number;
  eager?: boolean;
  gteSm?: boolean;
  ltSm?: boolean;
  className?: string;
}

export interface ImgGroupProps {
  imageGroup: ImageGroup;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  eager?: boolean;
  className?: string;
}

function Img({
  url,
  alt,
  height,
  width,
  eager,
  gteSm,
  ltSm,
  className,
}: ImgProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgElemRef: RefObject<HTMLImageElement> = useRef(null);

  // if it's not loaded in 2 seconds, just show what we've got no matter what
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 2000);
  }, []);

  useEffect(() => {
    if (imgElemRef.current?.complete) setIsLoaded(true);
  }, [imgElemRef.current]);

  if (gteSm && ltSm)
    throw new Error("gteSm & ltSm cannot be used at the same time.");

  return (
    <img
      ref={imgElemRef}
      onLoad={() => setIsLoaded(true)}
      loading={eager ? "eager" : "lazy"}
      src={url}
      alt={alt ?? "an image w/o an alt provided by the author"}
      height={height}
      width={width}
      className={`${gteSm ? "hidden sm:block" : ""} ${
        ltSm ? "block sm:hidden" : ""
      } ${className ?? ""} ${isLoaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}

function ImgGroup({
  imageGroup,
  mobileOnly,
  desktopOnly,
  eager,
  className,
}: ImgGroupProps) {
  if (mobileOnly && desktopOnly)
    throw new Error(
      "mobileOnly & desktopOnly cannot be used at the same time."
    );

  const desktopImg = (
    <Img
      gteSm
      className={className}
      eager={eager}
      alt={imageGroup.alt}
      {...imageGroup.desktop}
    />
  );

  const mobileImg = (
    <Img
      ltSm
      className={className}
      eager={eager}
      alt={imageGroup.alt}
      {...imageGroup.mobile}
    />
  );

  if (mobileOnly) return mobileImg;
  else if (desktopOnly) return desktopImg;
  else
    return (
      <>
        {desktopImg}
        {mobileImg}
      </>
    );
}

export default ImgGroup;
