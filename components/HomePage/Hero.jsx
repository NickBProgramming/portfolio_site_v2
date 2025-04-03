"use client";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, } from "lucide-react";

export default function Hero() {
return (
    <div className="flex container justify-between items-center py-4 justify-self-center">
        <div className="flex flex-col items-center justify-self-center">
          {/* INTRODUCTION AREA */}
          <div className="text-center">
            <p className="text-xl mt-4">Full-Stack Software Engineer</p>
            <h1 className="text-5xl font-bold">Hello, I'm Nick</h1>
            <p className="text-xl mt-4">
              I build engaging, efficient, and scalable software solutions to
              solve complex problems and enhance user experiences.
            </p>
          </div>

          {/* DESCRIPTION AREA */}
          <div className="text-center">
            <p className="font-light mt-4">
              A passionate Software Engineer with a knack for creating efficient
              and scalable web applications.
            </p>
          </div>

          {/* BUTTON AREA */}
          <div className="flex gap-4 mt-4">
            <Button>Get in Touch</Button>
            <Button variant="outline" size="icon">
              <Github size={24} />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin size={24} />
            </Button>
          </div>
        </div>
        {/* create a circular profile image */}
        <div className="container flex justify-center mt-10">
  <div className="h-80 w-80 rounded-full overflow-hidden bg-gray-800 relative border-4 border-transparent animate-border">
    <div className="absolute inset-0 rounded-full border-4 border-transparent animate-border"></div>
    <img
      src="/Pictures/Me.jpg"
      alt="Profile"
      className="h-full w-full object-cover rounded-full"
    />
  </div>

  <style jsx>{`
    @keyframes border-color-animation {
      0% {
        border-color: #f87171; /* red-400 */
      }
      33% {
        border-color: #60a5fa; /* blue-400 */
      }
      66% {
        border-color: #34d399; /* green-400 */
      }
      100% {
        border-color: #f87171; /* red-400 */
      }
    }
    .animate-border {
      animation: border-color-animation 3s infinite linear;
    }
  `}</style>
</div>
      </div>
)
}