"use client";
import Experience from "@/components/HomePage/Tabs/Experiences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // Adjust path as needed
import { Github, GithubIcon, Linkedin, LucideLinkedin } from "lucide-react";
import { useEffect, useRef } from "react";
import Skills from "@/components/HomePage/Tabs/Skills";
import Projects from "@/components/HomePage/Tabs/Projects";
import Education from "@/components/HomePage/Tabs/Education";
import About from "@/components/HomePage/Tabs/About";
import Hero from "@/components/HomePage/Hero";

export default function Test() {
  const commitsRef = useRef(null);
  const yearsRef = useRef(null);
  const technologiesRef = useRef(null);

  useEffect(() => {
    const commits = 1500; // Example value
    const years = 5; // Example value
    const technologies = 20; // Example value

    animateValue(commitsRef.current, 0, commits, 2000);
    animateValue(yearsRef.current, 0, years, 2000);
    animateValue(technologiesRef.current, 0, technologies, 2000);
  }, []);

  function animateValue(element, start, end, duration) {
    if (!element) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 2);
      element.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  return (
    <div className="bg-gray-950 text-white h-screen">
      <Hero />

      {/* STATS AREA */}
      <div className="flex justify-around p-5 ">
        <div className="text-center flex">
          <h3 ref={commitsRef} className="text-4xl font-bold">
            0
          </h3>
          <p>Commits</p>
        </div>
        <div className="text-center flex ">
          <h3 ref={yearsRef} className="text-4xl font-bold">
            0
          </h3>
          <p>Years of Experience</p>
        </div>
        <div className="text-center flex ">
          <h3 ref={technologiesRef} className="text-4xl font-bold">
            0
          </h3>
          <p>Technologies Learned</p>
        </div>
      </div>
      {/* END OF STATS */}

      {/* START OF TABS */}
      <Tabs defaultValue="about" orientation="vertical"  className="w-full">
        <TabsList className="bg-gray-900 justify-self-center right-10">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        <TabsContent value="experience">
          <div className="bg-green-950 pt-1 pb-10">
            <Experience />
          </div>
        </TabsContent>
        <TabsContent value="skills">
          <div className="bg-green-950 pt-1 pb-10">
            <Skills />
          </div>
        </TabsContent>
        <TabsContent value="projects">
          <Projects />
        </TabsContent>
        <TabsContent value="education">
          <div className="bg-green-950 pt-1 pb-10">
            <Education />
          </div>
        </TabsContent>
        <TabsContent value="about">
          <div className="bg-green-950 pt-1 pb-10">
            <About />
          </div>
        </TabsContent>
      </Tabs>
      {/* END OF TABS */}

      {/* TESIMONIALS */}

      {/* END OF TESTIMONIALS */}

      {/* CONTACT AREA */}

      {/* END OF CONTACT AREA */}
      {/* FOOTER */}
      <footer className="flex justify-center items-center h-20 bg-gray-950">
        <p className="text-sm">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Nick
        </p>
      </footer>

    </div>
  );
}
