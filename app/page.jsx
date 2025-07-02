"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import HexagonGrid from "@/components/hexagon-grid";
import { FileText } from "lucide-react";

// Dynamically import components that use client-side features
const HexagonBackground = dynamic(() =>
  import("@/components/hexagon-background")
);

export default function Home() {
  // Typewriter effect function
  function typewriterEffect(elementId, text, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;
    let i = 0;

    function type() {
      element.textContent = text.slice(0, i + 1);
      i++;
      if (i < text.length) {
        setTimeout(type, 80);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  useEffect(() => {
    // Trigger the typewriter effect for "Nicholas Brown"
    typewriterEffect("text1", "Nicholas Brown", () => {
      // Once "Nicholas Brown" is done, show the second text and start typing it
      const text2Element = document.getElementById("text2");
      text2Element.style.opacity = 1; // Make the second text visible
      typewriterEffect("text2", "Full Stack Engineer", () => {
        // Any additional actions after both texts are typed can go here
      });
    });
  }, []); // Empty dependency array ensures this runs only once when component mounts

  return (
    <main>
      {/* Header section with typing animation */}
      <header className="fixed top-0 left-0 right-0 z-10 text-center text-4xl font-bold text-white py-4">
        <span className="jumble-text" id="text1"></span>
        <div className="text-2xl mt-4 opacity-0 animate-fadeIn">
          <span
            className="jumble-text-2"
            id="text2"
            style={{ opacity: 0 }}
          ></span>
        </div>
      </header>

      <HexagonBackground />
      <div className="relative w-full h-screen overflow-hidden ">
        <HexagonGrid />
      </div>

      <footer className="absolute bottom-0 left-0 right-0 text-center text-gray-500 p-4">
        <div className="group group-hover:animate-jiggle">
          <a
            href="/resume.pdf"
            className="absolute bottom-4 right-4 bg-gray-700 text-white flex items-center justify-center w-10 h-10 hover:bg-gray-600 transition cursor-pointer z-10 group-hover:animate-jiggle"
            title="Resume"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          >
            <FileText />
          </a>
          <div
            className="absolute bottom-10 right-3 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full border-2 border-white group-hover:animate-jiggle"
            style={{ zIndex: 99 }}
          />
          <style>
            {`
      .group:hover a {
        animation: jiggle 1s ease-in-out infinite;
      }

      @keyframes jiggle {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(6deg); }
        50% { transform: rotate(-6deg); }
        75% { transform: rotate(2deg); }
        100% { transform: rotate(0deg); }
      }
    `}
          </style>
        </div>
      </footer>
    </main>
  );
}
