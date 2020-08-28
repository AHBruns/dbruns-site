import React, { useEffect, useRef, useState, RefObject } from "react";

function ThreeDimensionalBook({
  height,
  width,
  href,
  src,
}: {
  height: number;
  width: number;
  href?: string;
  src: string;
}) {
  const ref: RefObject<HTMLImageElement> = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setIsLoaded(true);
  }, [ref.current]);

  return (
    <div
      className={`px-2 py-6 transition-all ease-in-out duration-300 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {href ? (
        <a
          className="book-container"
          href={href}
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className="book">
            <img
              onLoad={() => setIsLoaded(true)}
              ref={ref}
              alt="The Outstanding Developer by Sebastien Castiel"
              src={src}
              height={height}
              width={width}
            />
          </div>
        </a>
      ) : (
        <div className="book-container">
          <div className="book">
            <img
              onLoad={() => setIsLoaded(true)}
              ref={ref}
              alt="The Outstanding Developer by Sebastien Castiel"
              src={src}
              height={height}
              width={width}
            />
          </div>
        </div>
      )}
      <style jsx>{`
        .book-container {
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 600px;
        }

        @keyframes initAnimation {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(-30deg);
          }
        }

        .book {
          width: 200px;
          height: 300px;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateY(-30deg);
          animation-delay: 300ms;
          transition: 1s ease;
          animation: 1s ease 0s 1 initAnimation;
        }

        .book:hover {
          transform: rotateY(0deg);
        }

        .book > :first-child {
          position: absolute;
          top: 0;
          left: 0;
          background-color: red;
          width: 200px;
          height: 300px;
          transform: translateZ(25px);
          background-color: #01060f;
          border-radius: 1px 2px 2px 1px;
          box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
        }

        .book::before {
          position: absolute;
          content: " ";
          background-color: blue;
          left: 0;
          top: 3px;
          width: 48px;
          height: 294px;
          transform: translateX(172px) rotateY(90deg);
          background: linear-gradient(
            90deg,
            #fff 0%,
            #f9f9f9 5%,
            #fff 10%,
            #f9f9f9 15%,
            #fff 20%,
            #f9f9f9 25%,
            #fff 30%,
            #f9f9f9 35%,
            #fff 40%,
            #f9f9f9 45%,
            #fff 50%,
            #f9f9f9 55%,
            #fff 60%,
            #f9f9f9 65%,
            #fff 70%,
            #f9f9f9 75%,
            #fff 80%,
            #f9f9f9 85%,
            #fff 90%,
            #f9f9f9 95%,
            #fff 100%
          );
        }

        .book::after {
          position: absolute;
          top: 0;
          left: 0;
          content: " ";
          width: 200px;
          height: 300px;
          transform: translateZ(-25px);
          background-color: #01060f;
          border-radius: 0 2px 2px 0;
          box-shadow: -10px 0 50px 10px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

export default ThreeDimensionalBook;
