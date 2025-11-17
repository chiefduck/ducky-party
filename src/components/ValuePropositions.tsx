import { motion } from "framer-motion";
import { Truck, Shield, Leaf } from "lucide-react";

const values = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free standard shipping on all orders over $35",
    gradient: "from-primary via-secondary to-accent",
    rotation: "rotate-[-2deg]",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "100% satisfaction guaranteed or your money back",
    gradient: "from-secondary via-accent to-primary",
    rotation: "rotate-[1deg]",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Recyclable cans, natural ingredients, carbon-conscious shipping",
    gradient: "from-accent via-primary to-secondary",
    rotation: "rotate-[-1deg]",
  },
];

export const ValuePropositions = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-foreground">
            WHY SHOP WITH US
          </h2>
          <p className="text-xl text-muted-foreground font-bold">
            More than just great drinks—we're committed to great service
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`bg-gradient-to-br ${value.gradient} p-8 rounded-3xl border-4 border-foreground shadow-2xl ${value.rotation} hover:rotate-0 hover:scale-105 transition-all duration-300`}
            >
              <value.icon className="w-16 h-16 mb-6 text-background" strokeWidth={3} />
              <h3 className="text-3xl font-black mb-4 text-background">
                {value.title}
              </h3>
              <p className="text-lg text-background/90 leading-relaxed font-bold">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
