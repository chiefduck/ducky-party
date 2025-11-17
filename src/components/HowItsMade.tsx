import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import step1 from "@/assets/production-step-1.png";
import step2 from "@/assets/production-step-2.png";
import step3 from "@/assets/production-step-3.png";
import step4 from "@/assets/production-step-4.png";

const productionSteps = [
  {
    number: "01",
    title: "Sourcing Real Ingredients",
    description: "We start with the best—real tropical fruits, natural extracts, and premium ingredients. No artificial flavors, no shortcuts. Just fresh, bold, authentic taste.",
    image: step1,
    gradient: "from-primary via-secondary to-accent",
  },
  {
    number: "02",
    title: "Expert Flavor Crafting",
    description: "Our mixologists work their magic, blending ingredients in precise ratios to create perfectly balanced, crave-worthy flavors that rival any cocktail.",
    image: step2,
    gradient: "from-secondary via-accent to-sunshine",
  },
  {
    number: "03",
    title: "Rigorous Quality Testing",
    description: "Every batch is tested for flavor, consistency, and quality. We taste-test, re-test, and perfect until it's exactly right. Because you deserve nothing less.",
    image: step3,
    gradient: "from-accent via-primary to-secondary",
  },
  {
    number: "04",
    title: "Canned & Ready to Enjoy",
    description: "Sealed fresh in recyclable aluminum cans to lock in flavor and fizz. From our facility to your fridge, ready to crack open and celebrate.",
    image: step4,
    gradient: "from-sunshine via-primary to-accent",
  },
];

const StepCard = ({ step, index }: { step: typeof productionSteps[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`grid lg:grid-cols-2 gap-8 items-center ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image Side */}
      <motion.div
        className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`bg-gradient-to-br ${step.gradient} p-4 rounded-3xl border-4 border-foreground shadow-2xl overflow-hidden`}>
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-auto rounded-2xl"
          />
        </div>
        
        {/* Step Number Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          className="absolute -top-6 -right-6 bg-foreground text-background w-20 h-20 rounded-full flex items-center justify-center border-4 border-background shadow-xl"
        >
          <span className="text-3xl font-black">{step.number}</span>
        </motion.div>
      </motion.div>

      {/* Text Side */}
      <div className={index % 2 === 1 ? "lg:order-1" : ""}>
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
        >
          <h3 className="text-4xl md:text-5xl font-black mb-6 text-foreground">
            {step.title}
          </h3>
          <p className="text-xl text-muted-foreground leading-relaxed font-bold">
            {step.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const HowItsMade = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-foreground">
            HOW IT'S MADE
          </h2>
          <p className="text-2xl text-muted-foreground font-bold max-w-3xl mx-auto">
            From fruit to can, every step is crafted with care and a whole lot of flavor obsession
          </p>
        </motion.div>

        {/* Production Steps */}
        <div className="max-w-7xl mx-auto space-y-32">
          {productionSteps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-24"
        >
          <div className="inline-block bg-gradient-to-r from-primary via-secondary to-accent p-8 rounded-3xl border-4 border-foreground shadow-2xl rotate-[-2deg] hover:rotate-0 transition-all duration-300">
            <p className="text-2xl md:text-3xl font-black text-background">
              The result? Drinks so good, you won't miss the alcohol. 🍹
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
