"use client";
import { motion } from "framer-motion"
import { memo } from "react"

// Animation variants for staggered children
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

// Memoize card component for better performance
const InfoCard = memo(({
  title,
  children
}) => (
  <motion.div
    className="bg-gray-700 bg-opacity-50 p-4 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
    variants={itemVariants}
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}>
    <h3 className="text-xl font-semibold text-purple-300 mb-2">{title}</h3>
    {children}
  </motion.div>
))

function AboutSection() {
  return (
    (<motion.div
      className="text-white space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.h2
        className="text-3xl font-bold text-purple-300 mb-4"
        variants={itemVariants}>
        About Me
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <motion.p className="text-lg" variants={itemVariants}>
            Hi there! I'm a passionate Full Stack Engineer with expertise in building modern web applications. With over
            3 years of experience in the industry, I've worked on a wide range of projects from small startups to large
            enterprise applications.
          </motion.p>

          <motion.p className="text-lg" variants={itemVariants}>
            My approach to development focuses on creating clean, maintainable code that delivers exceptional user
            experiences. I'm constantly learning and exploring new technologies to stay at the forefront of web
            development.
          </motion.p>

          <motion.p className="text-lg" variants={itemVariants}>
            When I'm not coding, you can find me airsofing in the mountains, playing D&D, or experimenting with
            new cooking recipes.
          </motion.p>
        </div>

        <div className="space-y-4">
          <InfoCard title="Education">
            <p>B.S. in Computer Science, Colorado School of Mines</p>
            <p>A.S. in Computer Science, Red Rocks Community College</p>
          </InfoCard>

          <InfoCard title="Location">
            <p>Centennial, Colorado</p>
            <p>Available for remote work worldwide</p>
          </InfoCard>

          <InfoCard title="Languages">
            <p>English (Native)</p>
            <p>American Sign Language</p>
          </InfoCard>
        </div>
      </div>
    </motion.div>)
  );
}

export default memo(AboutSection);

