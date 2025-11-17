import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import logo from "@/assets/logo.svg";

const duckPositions = [
  { top: "10%", left: "5%", delay: 0 },
  { top: "20%", right: "10%", delay: 0.5 },
  { top: "60%", left: "8%", delay: 1 },
  { top: "70%", right: "15%", delay: 1.5 },
  { top: "40%", left: "15%", delay: 2 },
  { top: "50%", right: "5%", delay: 2.5 },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen rainbow-gradient flex items-center justify-center overflow-hidden py-20 px-4">

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <img src={logo} alt="Rubber Ducky" className="w-48 h-auto mx-auto" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-foreground mb-6 sm:mb-8 leading-[1.1] sm:leading-none px-2 sm:px-4"
          style={{
            textShadow: "3px 3px 0px rgba(0,0,0,0.2)",
            transform: "rotate(-2deg)",
          }}
        >
          MARGARITAS.
          <br />
          <span className="text-primary">BUT MAKE IT</span>
          <br />
          <span className="text-accent">SOBER.</span>
        </motion.h1>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 w-full max-w-2xl mx-auto"
        >
          <Button
            size="lg"
            className="text-lg sm:text-2xl font-black py-6 sm:py-8 px-8 sm:px-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full sm:w-auto"
          >
            QUACK ONE OPEN
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg sm:text-2xl font-black py-6 sm:py-8 px-8 sm:px-12 rounded-full border-4 border-foreground bg-background hover:bg-secondary transition-all hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            <MapPin className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
            FIND NEAR YOU
          </Button>
        </motion.div>

        {/* Stats badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4"
        >
          {[
            { text: "0% BOOZE", color: "bg-primary", rotate: -3 },
            { text: "60 CALS", color: "bg-secondary", rotate: 2 },
            { text: "100% VIBES", color: "bg-accent", rotate: -2 },
          ].map((badge, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, rotate: 0 }}
              className={`${badge.color} text-foreground font-black text-base sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg border-4 border-foreground`}
              style={{ transform: `rotate(${badge.rotate}deg)` }}
            >
              {badge.text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
