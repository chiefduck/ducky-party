import { motion } from "framer-motion";
import { Sparkles, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const futureFlavors = [
  {
    name: "Strawberry Daiquiri",
    emoji: "🍓",
    description: "Sweet and tangy perfection",
    color: "from-pink-400/20 to-red-400/20",
    borderColor: "border-pink-400"
  },
  {
    name: "Piña Colada",
    emoji: "🥥",
    description: "Tropical paradise in a can",
    color: "from-yellow-400/20 to-amber-400/20",
    borderColor: "border-yellow-400"
  },
  {
    name: "Blue Raspberry",
    emoji: "💙",
    description: "Bold berry blast",
    color: "from-blue-400/20 to-cyan-400/20",
    borderColor: "border-blue-400"
  }
];

export const FutureFlavors = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-6 py-2 text-lg bg-accent text-accent-foreground">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            Coming Soon
          </Badge>
          <h2 className="text-6xl md:text-8xl font-black text-foreground mb-4">
            FUTURE FLAVORS 🦆
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get ready for our next wave of non-alcoholic margarita magic!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {futureFlavors.map((flavor, i) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                transition: { duration: 0.3 },
              }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative bg-gradient-to-br ${flavor.color} backdrop-blur-sm p-8 border-4 ${flavor.borderColor} shadow-2xl`}
              style={{
                boxShadow: "8px 8px 0px rgba(0,0,0,0.15)",
              }}
            >
              {/* Lock Icon Overlay */}
              <div className="absolute top-4 right-4">
                <Lock className="w-6 h-6 text-muted-foreground/50" />
              </div>

              {/* Flavor Content */}
              <div className="text-center space-y-4">
                <div className="text-8xl mb-4 filter grayscale opacity-60">
                  {flavor.emoji}
                </div>
                <h3 className="text-3xl font-black text-foreground">
                  {flavor.name}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {flavor.description}
                </p>
                <div className="pt-4">
                  <Badge variant="secondary" className="text-sm">
                    Coming 2025
                  </Badge>
                </div>
              </div>

              {/* Diagonal "Coming Soon" Ribbon */}
              <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground px-8 py-1 transform rotate-[-8deg] font-black text-sm">
                SOON!
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-4">
            Want to be the first to know when these drop?
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="text-lg px-6 py-3 cursor-pointer hover:scale-105 transition-transform">
              🦆 Join the Waitlist
            </Badge>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
