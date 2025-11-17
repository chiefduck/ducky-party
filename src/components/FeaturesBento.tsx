import { motion } from "framer-motion";
import { Wine, Flame, Leaf, Sprout, Wheat, Sparkles } from "lucide-react";

const features = [
  {
    icon: Wine,
    title: "0% Alcohol",
    color: "bg-gradient-to-br from-primary to-primary/70",
    size: "lg:col-span-2",
  },
  {
    icon: Flame,
    title: "60 Calories",
    color: "bg-gradient-to-br from-secondary to-secondary/70",
    size: "lg:col-span-1",
  },
  {
    icon: Leaf,
    title: "Real Ingredients",
    color: "bg-gradient-to-br from-accent to-accent/70",
    size: "lg:col-span-1",
  },
  {
    icon: Sprout,
    title: "Vegan",
    color: "bg-gradient-to-br from-sunshine to-sunshine/70",
    size: "lg:col-span-1",
  },
  {
    icon: Wheat,
    title: "Gluten-Free",
    color: "bg-gradient-to-br from-primary to-accent",
    size: "lg:col-span-1",
  },
  {
    icon: Sparkles,
    title: "No Artificial Stuff",
    color: "bg-gradient-to-br from-secondary to-primary",
    size: "lg:col-span-2",
  },
];

export const FeaturesBento = () => {
  return (
    <section className="py-24 px-4 bg-muted relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-7xl md:text-9xl font-black text-center mb-16 text-foreground"
          style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
        >
          WHY WE RULE 🎯
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${feature.color} ${feature.size} p-8 rounded-3xl shadow-xl border-4 border-foreground flex flex-col items-center justify-center text-center min-h-[200px]`}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-4"
              >
                <feature.icon className="w-16 h-16 text-foreground" strokeWidth={3} />
              </motion.div>
              <h3 className="text-3xl font-black text-foreground">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
