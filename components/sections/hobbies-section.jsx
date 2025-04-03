"use client"

import React from "react"

import { motion } from "framer-motion"
import { useState, memo } from "react"
import Image from "next/image"
import { Gamepad2, Swords, Scroll, Crosshair, ChevronDown, ChevronUp } from "lucide-react"

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
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

const HobbyCard = memo(
  ({
    title,
    description,
    icon: Icon,
    color,
    children,
  }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
      <motion.div
        className={`bg-gray-700 bg-opacity-50 rounded-xl overflow-hidden`}
        variants={itemVariants}
        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
      >
        <div className="p-5 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
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
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-5 pt-0 bg-gray-700 bg-opacity-50">{children}</div>
        </motion.div>
      </motion.div>
    )
  },
)

function HobbiesSection() {
  return (
    <motion.div className="text-white" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h2 className="text-3xl font-bold text-indigo-400 mb-6" variants={itemVariants}>
        Hobbies & Interests
      </motion.h2>

      <motion.p className="text-lg mb-6" variants={itemVariants}>
        When I'm not coding, I love to immerse myself in various hobbies that fuel my creativity and strategic thinking.
        Here are a few of my favorite pastimes:
      </motion.p>

      <div className="space-y-4">
        <HobbyCard
          title="Dungeons & Dragons"
          description="Long-time DM and player, creating immersive fantasy worlds and adventures."
          icon={Swords}
          color="bg-purple-600"
        >
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-teal-200 font-semibold mb-2">My D&D Experience:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  <li>Dungeon Master for 7+ years</li>
                  <li>Created multiple homebrew campaigns</li>
                  <li>Specializing in narrative-driven adventures</li>
                  <li>Favorite classes to play: Wizard and Artificer</li>
                  <li>Collector of hand-painted miniatures</li>
                </ul>
              </div>
              <div>
                <h4 className="text-teal-200 font-semibold mb-2">Current Campaigns:</h4>
                <div className="space-y-2">
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">Shadows of Elderheim</p>
                    <p className="text-sm text-gray-300">
                      DM for a long-running campaign set in a dark fantasy world where players navigate political
                      intrigue and ancient mysteries.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">Curse of Strahd</p>
                    <p className="text-sm text-gray-300">
                      Player character: Alaric, a Chronurgy Wizard seeking to manipulate time to prevent a family
                      tragedy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-40 md:h-60 w-full overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=240&width=640"
                alt="D&D game session with dice, character sheets and miniatures"
                fill
                className="object-cover"
              />
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
                <h4 className="text-teal-200 font-semibold mb-2">Favorite Genres:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  <li>RPGs (Western and JRPGs)</li>
                  <li>Strategy and 4X</li>
                  <li>Action-Adventure</li>
                  <li>Indie and Rogue-like</li>
                  <li>Simulation</li>
                </ul>

                <h4 className="text-teal-200 font-semibold mt-4 mb-2">Platforms:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">PC</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Nintendo Switch</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">PlayStation 5</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Retro Consoles</span>
                </div>
              </div>

              <div>
                <h4 className="text-teal-200 font-semibold mb-2">All-Time Favorites:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>The Witcher 3</span>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>Baldur's Gate 3</span>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>Civilization VI</span>
                    <span className="text-yellow-400">★★★★☆</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>Legend of Zelda: BOTW</span>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>Hades</span>
                    <span className="text-yellow-400">★★★★☆</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-300 italic">
              "Currently exploring Elden Ring's latest DLC and diving into indie game development as a side project."
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
                <h4 className="text-teal-200 font-semibold mb-2">Play History:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  <li>Playing since Theros block</li>
                  <li>Commander enthusiast</li>
                  <li>Draft and Sealed specialist</li>
                  <li>Local game store tournament participant</li>
                  <li>Card collector with complete sets of several expansions</li>
                </ul>

                <h4 className="text-teal-200 font-semibold mt-4 mb-2">Color Preferences:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-900 rounded-full text-sm">Blue</span>
                  <span className="px-3 py-1 bg-green-900 rounded-full text-sm">Green</span>
                  <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm border border-gray-500">
                    Colorless
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-800 to-red-800 rounded-full text-sm">
                    Izzet
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-green-800 to-blue-800 rounded-full text-sm">
                    Simic
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-teal-200 font-semibold mb-2">Favorite Decks:</h4>
                <div className="space-y-2">
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">Breya, Artificer Prodigy</p>
                    <p className="text-sm text-gray-300">
                      Commander deck focused on artifact synergies and combo finishes.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">Animar, Soul of Elements</p>
                    <p className="text-sm text-gray-300">Creature-heavy deck that scales fast with +1/+1 counters.</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">Modern Tron</p>
                    <p className="text-sm text-gray-300">
                      Classic "Urza Lands" deck for dropping huge colorless threats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <blockquote className="border-l-4 border-teal-400 pl-4 italic text-gray-300">
              "There's nothing like the feeling of drafting a perfect deck or pulling off a complex combo in Commander."
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
                <h4 className="text-teal-200 font-semibold mb-2">Experience:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  <li>Playing for 5+ years</li>
                  <li>Part of a 12-person tactical team</li>
                  <li>Participate in weekend-long scenario games</li>
                  <li>Focus on milsim (military simulation) events</li>
                  <li>Custom gear builder and modifier</li>
                </ul>

                <h4 className="text-teal-200 font-semibold mt-4 mb-2">Loadout Styles:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">CQB Specialist</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Support Gunner</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Marksman</span>
                </div>
              </div>

              <div>
                <h4 className="text-teal-200 font-semibold mb-2">Favorite Gear:</h4>
                <div className="space-y-2">
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">Primary: VFC Avalon Series</p>
                    <p className="text-sm text-gray-300">
                      Customized with upgraded internals, GATE TITAN mosfet, and precision barrel.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">Secondary: Tokyo Marui G17</p>
                    <p className="text-sm text-gray-300">Modified with lightweight slide and upgraded hop-up.</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="font-medium text-indigo-400">Field Preferences</p>
                    <p className="text-sm text-gray-300">
                      Outdoor woodland and urban environments with mixed terrain for dynamic gameplay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-40 md:h-60 w-full overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=240&width=640"
                alt="Airsoft tactical gear and loadout"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </HobbyCard>
      </div>

      <motion.div className="mt-8 bg-gray-700 bg-opacity-50 p-6 rounded-xl" variants={itemVariants}>
        <h3 className="text-xl font-bold text-indigo-400 mb-4">Why These Hobbies?</h3>
        <p className="text-gray-200">
          These hobbies complement my development work in surprising ways. D&D and MTG sharpen my strategic thinking and
          creativity, video games keep me aware of UX/UI trends and interactive design principles, while airsoft builds
          teamwork and quick decision-making skills. The problem-solving mindset I use as a developer transfers
          perfectly to deck building, campaign planning, and tactical gameplay.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default memo(HobbiesSection)

