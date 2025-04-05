"use client";

import React from "react";

import { motion } from "framer-motion";
import { useState, memo } from "react";
import Image from "next/image";
import {
  Gamepad2,
  Swords,
  Scroll,
  Crosshair,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const HobbyCard = memo(
  ({ title, description, icon: Icon, color, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <motion.div
        className={`bg-gray-700 bg-opacity-50 rounded-xl overflow-hidden`}
        variants={itemVariants}
        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
      >
        <div
          className="p-5 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-indigo-400">{title}</h3>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <p className="text-gray-300 mt-2">{description}</p>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-5 pt-0 bg-gray-700 bg-opacity-50">{children}</div>
        </motion.div>
      </motion.div>
    );
  }
);

function HobbiesSection() {
  return (
    <motion.div
      className="text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl font-bold text-indigo-400 mb-6"
        variants={itemVariants}
      >
        Hobbies & Interests
      </motion.h2>

      <motion.p className="text-lg mb-6" variants={itemVariants}>
        When I'm not coding, I love to immerse myself in various hobbies that
        fuel my creativity and strategic thinking. Here are a few of my favorite
        pastimes:
      </motion.p>

      <div className="space-y-4">
        <HobbyCard
          title="Dungeons & Dragons"
          description="Long-time DM and player, creating immersive fantasy worlds and adventures."
          icon={Swords}
          color="bg-purple-600"
        >
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 pt-5">
              <div>
                <h4 className="text-teal-200 font-semibold mb-2">
                  My D&D Experience:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  <li>Dungeon Master for 7+ years</li>
                  <li>Created multiple homebrew campaigns</li>
                  <li>Specializing in narrative-driven adventures</li>
                  <li>Favorite classes to play: Wizard and Artificer</li>
                  <li>Collector of totally not too much dice</li>
                  <li>Thinking of making a barbarian / sorcerer multiclass character</li>
                </ul>
              </div>
              <div>
                <h4 className="text-teal-200 font-semibold mb-2">
                  Current Campaigns:
                </h4>
                <div className="space-y-2">
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">
                      Rakktus Broken
                    </p>
                    <p className="text-sm text-gray-300">
                      DM for a long-running campaign set in a dark fantasy world
                      where players navigate political intrigue and ancient
                      mysteries.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">
                      Mundus Madness
                    </p>
                    <p className="text-sm text-gray-300">
                      A long-running campaign set in a dark fantasy world
                      where players navigate political intrigue and delt with complex ever-changing hostilities
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
            
          </div>
        </HobbyCard>

        <HobbyCard
          title="Video Games"
          description="Avid gamer across multiple platforms, with a passion for RPGs and strategy games."
          icon={Gamepad2}
          color="bg-blue-600"
        >
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-teal-200 font-semibold mb-2">
                  Favorite Genres:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  <li>RPGs (Western and JRPGs)</li>
                  <li>Strategy and 4X</li>
                  <li>Action-Adventure</li>
                  <li>Indie and Rogue-like</li>
                  <li>Space / Simulation</li>
                </ul>

                <h4 className="text-teal-200 font-semibold mt-4 mb-2">
                  Platforms:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    PC
                  </span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    Nintendo Switch
                  </span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    Xbox One
                  </span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    Game Cube
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-teal-200 font-semibold mb-2">
                  All-Time Favorites:
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>Star Citizen</span>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>Baldur's Gate 3</span>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>Civilization V</span>
                    <span className="text-yellow-400">★★★★☆</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>Warhammer 40,000 - Rogue Trader</span>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>Total War: Warhammer III</span>
                    <span className="text-yellow-400">★★★★☆</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-300 italic">
              "Currently exploring the God of War series and diving into indie
              game development as a side project."
            </p>
          </div>
        </HobbyCard>

        <HobbyCard
          title="Magic: The Gathering"
          description="Deck builder and collector with a focus on Commander and Limited formats."
          icon={Scroll}
          color="bg-red-600"
        >
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-teal-200 font-semibold mb-2">
                  Play History:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  <li>Playing since 2017</li>
                  <li>Commander enthusiast</li>
                  <li>Local Tournement winner x2</li>
                  <li>Local game store tournament winner x2</li>
                  <li>Created 5 custom decks</li>
                </ul>

                <h4 className="text-teal-200 font-semibold mt-4 mb-2">
                  Color Preferences:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-black rounded-full text-sm">
                    Black
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-800 to-red-800 rounded-full text-sm">
                    Izzet
                  </span>
                  <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm border border-gray-500">
                    Colorless
                  </span>

                  <span className="px-3 py-1 bg-blue-900 rounded-full text-sm">
                    Blue
                  </span>

                  <span className="px-3 py-1 bg-green-900 rounded-full text-sm">
                    Green
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-teal-200 font-semibold mb-2">
                  Favorite Decks:
                </h4>
                <div className="space-y-2">
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">
                      Necrons – Szarekh, the Silent King
                    </p>
                    <p className="text-sm text-gray-300">
                      Artifact-heavy Commander deck from Warhammer 40k, focused
                      on recursion, synergy, and overwhelming board presence.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">
                      Saheeli, the Gifted
                    </p>
                    <p className="text-sm text-gray-300">
                      Spellslinger/artifact deck that ramps out big threats
                      using Saheeli’s cost reduction and token generation.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">
                      Mono-Blue (In Progress)
                    </p>
                    <p className="text-sm text-gray-300">
                      Still in the works — a control-oriented mono-blue deck
                      with a focus on counterspells, card draw, and tempo plays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <blockquote className="border-l-4 border-teal-400 pl-4 italic text-gray-300">
              "There's nothing like the feeling of drafting a perfect deck or
              pulling off a complex combo in Commander."
            </blockquote>
          </div>
        </HobbyCard>

        <HobbyCard
          title="Airsoft"
          description="Tactical airsoft player focusing on teamwork, strategy, and realistic scenario games."
          icon={Crosshair}
          color="bg-green-600"
        >
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-teal-200 font-semibold mb-2">
                  Experience:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  <li>Playing for 5+ years</li>
                  <li>Part of a 5-person tactical team</li>
                  <li>Participate in weekend-long scenario games</li>
                  <li>Focus on milsim (military simulation) events</li>
                  <li>Trying to learn to build custom gear</li>
                </ul>

                <h4 className="text-teal-200 font-semibold mt-4 mb-2">
                  Loadout Styles:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    CQB Specialist
                  </span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    Grenadier
                  </span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    Marksman
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-teal-200 font-semibold mb-2">
                  Favorite Gear:
                </h4>
                <div className="space-y-2">
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">
                      Primary: VFC Avalon Series
                    </p>
                    <p className="text-sm text-gray-300">
                      Customized with upgraded internals, GATE TITAN mosfet, and
                      precision barrel.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">
                      Secondary: Novritch SSX23
                    </p>
                    <p className="text-sm text-gray-300">
                      Modified with surpressor & upgraded hop up
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">
                      Field Preferences
                    </p>
                    <p className="text-sm text-gray-300">
                      Outdoor woodland and urban environments with mixed terrain
                      for dynamic gameplay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HobbyCard>
      </div>

      <motion.div
        className="mt-8 bg-gray-700 bg-opacity-50 p-6 rounded-xl"
        variants={itemVariants}
      >
        <h3 className="text-xl font-bold text-indigo-400 mb-4">
          Why These Hobbies?
        </h3>
        <p className="text-gray-200">
        Several of my hobbies have overlapped significantly with skills I use in development. D&D and Magic the Gathering both share strategic elements of planning ahead to achieve an end result, whether that be preparing a campaign for my players or decimating an opponent with well-timed spell combinations. The video games that I play provide reference for what to do (and not do) with UI, while airsoft promotes rapid decision making and teamwork to solve problems... and not get shot by teenagers with better aim. Ultimately, it all helps to round out a suite of problem solving skills that I transfer to development frequently.        </p>
      </motion.div>
    </motion.div>
  );
}

export default memo(HobbiesSection);
