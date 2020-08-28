import React, { useState } from "react";

function NewsletterCard({
  title,
  body,
  handleMouseEnter,
  handleMouseLeave,
  showFull,
}: {
  title: string;
  body: string;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  showFull: boolean;
}) {
  return (
    <>
      <div
        className={`flex-1 max-w-md p-3 sm:p-6 ${
          showFull ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDuration: "750ms",
          filter: showFull ? "" : "blur(75px)",
        }}
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transitionDuration: "750ms",
          }}
          className="flex flex-col justify-between h-full p-4 space-y-4 transition-all ease-in-out transform bg-gray-900 bg-opacity-50 rounded-md hover:scale-125 CONTENT"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-wider text-gray-50">
              {title}
            </h1>
            <p className="text-lg tracking-widest text-white">
              {body
                .split("\\n")
                .flatMap((elem) => [elem, <br />])
                .slice(0, -1)}
            </p>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <input
              className="flex-1 px-3 py-2 text-gray-800 bg-white rounded-md shadow-md focus:outline-none"
              placeholder="john.doe@gmail.com"
            />
            <button
              aria-label="submit email"
              className="px-3 py-2 font-semibold tracking-wider text-white bg-gray-800 rounded-md shadow-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .CONTENT {
          backdrop-filter: blur(2px);
        }
      `}</style>
    </>
  );
}

function Newsletters({
  openness,
  setOpenness,
}: {
  openness: string;
  setOpenness: (_: string) => void;
}) {
  const [showingTheme, setShowingTheme] = useState("NONE");

  return (
    <div
      className={`z-20 relative flex flex-col overflow-hidden items-center justify-center w-full h-full`}
    >
      <img
        src="https://artfiles.alphacoders.com/782/thumb-1920-78237.jpg"
        className={`absolute object-cover max-w-full max-h-full min-w-full min-h-full transition-all ease-in-out ${
          showingTheme === "DUNE" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDuration: "1500ms",
        }}
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/US_Navy_040730-N-1234E-002_PCU_Virginia_%28SSN_774%29_returns_to_the_General_Dynamics_Electric_Boat_shipyard.jpg/1200px-US_Navy_040730-N-1234E-002_PCU_Virginia_%28SSN_774%29_returns_to_the_General_Dynamics_Electric_Boat_shipyard.jpg"
        className={`absolute object-cover max-w-full max-h-full min-w-full min-h-full transition-all ease-in-out ${
          showingTheme === "CHESS" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDuration: "1500ms",
        }}
      />
      <div
        className={`absolute inset-0 transition-all ease-in-out bg-gradient-to-br from-blue-600  to-teal-400 ${
          showingTheme === "NONE" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDuration: "1500ms",
        }}
      />
      <div
        className={`absolute inset-0 transition-all ease-in-out bg-gradient-to-tr from-red-600 via-transparent to-orange-400 ${
          showingTheme === "DUNE" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDuration: "1500ms",
        }}
      />
      <div
        className={`absolute inset-0 transition-all ease-in-out bg-gradient-to-tr from-blue-400 via-transparent to-white ${
          showingTheme === "CHESS" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDuration: "1500ms",
        }}
      />
      {openness === "OPEN" && (
        <>
          <h1
            className={`relative z-30 max-w-2xl text-3xl font-semibold leading-tight tracking-wider text-center text-white ${
              showingTheme === "NONE" ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transitionDuration: "750ms",
              filter: showingTheme === "NONE" ? "" : "blur(5px)",
            }}
          >
            What do you like to read? Help me tailor your reading experience.
          </h1>
          <div className="relative z-30 flex flex-col items-center justify-center w-full pt-16 sm:flex-row sm:items-stretch">
            <NewsletterCard
              handleMouseEnter={() => setShowingTheme("DUNE")}
              handleMouseLeave={() => setShowingTheme("NONE")}
              showFull={showingTheme !== "CHESS"}
              title="The Speculative Readers Group"
              body="The Speculative Reader's Group is for those who love old-school sci-fi. If you're a Star Trek fan and firmly believe DUNE is one of the finest novels ever, then you are my people.\n\nSpeculators get a free copy of my sci-fi/fantasy novel IRRADIANCE."
            />
            <div className="w-16" />
            <NewsletterCard
              handleMouseEnter={() => setShowingTheme("CHESS")}
              handleMouseLeave={() => setShowingTheme("NONE")}
              showFull={showingTheme !== "DUNE"}
              title="The Two Navy Guys Reader Group"
              body="Co-authors David Bruns and JR Olson write thrillers like WEAPONS OF MASS DECEPTION, about nuclear terrorism.\n\nFriends of the Two navy Guys get a free copy of DEATH OF A PAWN, a story abou the mysterious real-life death of Argentinean Special Prosecutor in 2015."
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Newsletters;
