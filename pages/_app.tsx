import React from "react";
import { AppProps } from "next/app";
import "lib/tailwind.css";
import { useRouter } from "next/router";

// function App({ Component, pageProps }: AppProps) {
//   const [openness, setOpenness] = useState("CLOSED");
//   const router = useRouter();

//   console.log(router.asPath);

//   return (
//     <div>
//       {router.asPath !== "/" && (
//         <div
//           className="fixed inset-y-0 left-0 z-40 hidden transition-all duration-300 ease-in-out bg-gray-800 md:flex"
//           style={{
//             transform: `
//           translateX(
//             calc(
//               (

//                 (100vw + (10 * 4px)) -
//                 ${
//                   openness === "CLOSED"
//                     ? "(10 * 4px)"
//                     : openness === "PEEKING"
//                     ? "(10vw + (10 * 4px))"
//                     : "(100vw + (10 * 4px))"
//                 }
//               ) * -1
//             )
//           )`,
//           }}
//           onMouseEnter={() => {
//             if (openness === "CLOSED") setOpenness("PEEKING");
//           }}
//           onMouseLeave={() => {
//             if (openness === "PEEKING") setOpenness("CLOSED");
//           }}
//           onClick={() => {
//             setOpenness("OPEN");
//           }}
//         >
//           <div className="relative flex w-screen ">
//             <button
//               className="absolute z-40 p-1 text-white transition-all duration-300 ease-in-out transform bg-gray-900 bg-opacity-50 rounded-full top-4 left-4 hover:shadow-md hover:scale-110 focus:outline-none"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpenness("CLOSED");
//               }}
//             >
//               <svg
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="w-4 h-4 x"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//             <Newsletters openness={openness} setOpenness={setOpenness} />
//             {openness === "PEEKING" && (
//               <>
//                 <div
//                   className="absolute z-40 flex items-center justify-center h-full text-white transform -translate-x-1/2 opacityPulse-css"
//                   style={{
//                     right: "calc(10vw / 2)",
//                   }}
//                 >
//                   <svg
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     className="absolute w-8 h-8"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <style jsx>{`
//                   @keyframes pulse {
//                     0% {
//                       opacity: 0.25;
//                     }
//                     50% {
//                       opacity: 0.95;
//                     }
//                     100% {
//                       opacity: 0.25;
//                     }
//                   }
//                   .opacityPulse-css {
//                     animation: pulse 1.5s ease-out;
//                     animation-iteration-count: infinite;
//                     opacity: 1;
//                   }
//                 `}</style>
//               </>
//             )}
//           </div>
//           <p
//             className="flex items-center justify-center w-10 text-xl font-bold leading-none tracking-widest text-white"
//             style={{
//               writingMode: "vertical-rl",
//               textOrientation: "mixed",
//             }}
//           >
//             Newsletters
//           </p>
//         </div>
//       )}
//       <div className="flex max-w-full">
//         {router.asPath !== "/" && <div className="hidden w-10 md:block" />}
//         <div className="flex-1 max-w-full">
//           <Component {...pageProps} />
//         </div>
//       </div>
//     </div>
//   );
// }

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  console.log(`'${router.asPath}'`);

  return (
    <div>
      {router.asPath !== "/" && <div className="p-10 bg-red-500" />}
      <div className="p-10 bg-green-500" />
    </div>
  );
}

export default App;
