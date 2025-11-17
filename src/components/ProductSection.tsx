import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import productClassic from "@/assets/product-classic.png";

const products = [
  {
    id: 1,
    name: "Classic Lime",
    image: productClassic,
    color: "border-secondary",
    rotate: -3,
    available: true,
  },
  {
    id: 2,
    name: "Watermelon Jalapeño",
    image: productClassic,
    color: "border-primary",
    rotate: 2,
    available: true,
  },
  {
    id: 3,
    name: "Strawberry",
    image: productClassic,
    color: "border-accent",
    rotate: -2,
    available: true,
  },
];

const comingSoon = [
  { name: "Passionfruit Guava", color: "border-sunshine" },
  { name: "Tropical", color: "border-primary" },
  { name: "Blueberry Mint", color: "border-secondary" },
];

export const ProductSection = () => {
  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background duckies */}
      <div className="absolute top-10 right-10 text-8xl opacity-20 bounce-float">
        🦆
      </div>
      <div className="absolute bottom-20 left-10 text-8xl opacity-20 bounce-float" style={{ animationDelay: "1s" }}>
        🦆
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-7xl md:text-9xl font-black text-center mb-20 text-foreground"
          style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
        >
          THE FLOCK 🦆
        </motion.h2>

        {/* Product Grid - Polaroid Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: product.rotate }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                transition: { duration: 0.2 },
              }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white p-6 pb-12 shadow-2xl ${product.color} border-8 cursor-pointer`}
              style={{
                boxShadow: "8px 8px 0px rgba(0,0,0,0.2)",
              }}
            >
              <div className="bg-muted aspect-square flex items-center justify-center mb-6 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-4 text-center">
                {product.name}
              </h3>
              <p className="text-center text-xl font-bold mb-2">
                4-Pack: <span className="text-primary">$14.99</span>
              </p>
              <p className="text-center text-xl font-bold mb-6">
                12-Pack: <span className="text-primary">$44.99</span>
              </p>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-black text-xl py-6 rounded-full border-4 border-foreground shadow-lg"
              >
                GRAB IT 🦆
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-5xl font-black text-foreground mb-8">
            COMING SOON 🎉
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {comingSoon.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className={`bg-muted ${item.color} border-4 px-8 py-4 rounded-full font-black text-2xl shadow-lg`}
                style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
              >
                {item.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
