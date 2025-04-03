import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Adjust path as needed
import { motion } from 'framer-motion'; // For smooth animations

export default function Skills() {
  return (
    <motion.div
      className="container justify-self-center "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-bold mt-10">Skills</h2>
      <Accordion type="single" collapsible className="w-full">
        <AnimatedAccordionItem
          value="1"
          title="Software Development Engineer - Advanced"
          content="Worked on high-performance systems, leading feature development."
        />
        <AnimatedAccordionItem
          value="2"
          title="Software Development Engineer"
          content="Contributed to scalable web applications and APIs."
        />
        <AnimatedAccordionItem
          value="3"
          title="IT Software Developer"
          content="Developed internal tools and optimized workflows."
        />
      </Accordion>
    </motion.div>
  );
}

// Reusable Animated Accordion Item
function AnimatedAccordionItem({ value, title, content }) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-xl font-bold">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="container"
        >
          {content}
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  );
}
