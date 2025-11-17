import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, Users, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

const recipes = [
  {
    id: 1,
    title: "Classic Serve 🍹",
    description: "The perfect simple pour",
    prepTime: "2 min",
    servings: "1",
    difficulty: "Easy",
    gradient: "from-[hsl(var(--primary))] to-[hsl(var(--accent))]",
    rotation: "-rotate-2",
    borderColor: "border-[hsl(var(--primary))]",
  },
  {
    id: 2,
    title: "Frozen Margarita 🧊",
    description: "Blend with ice, add lime garnish",
    prepTime: "5 min",
    servings: "2",
    difficulty: "Easy",
    gradient: "from-lime-400 to-green-500",
    rotation: "rotate-1",
    borderColor: "border-lime-500",
  },
  {
    id: 3,
    title: "Ducky Mocktail 🦆",
    description: "Mix with sparkling water, fruit garnish",
    prepTime: "3 min",
    servings: "1",
    difficulty: "Easy",
    gradient: "from-yellow-400 to-orange-500",
    rotation: "-rotate-1",
    borderColor: "border-yellow-500",
  },
  {
    id: 4,
    title: "Pool Party Punch 🏊",
    description: "Large batch recipe perfect for parties",
    prepTime: "10 min",
    servings: "8",
    difficulty: "Medium",
    gradient: "from-pink-400 to-purple-500",
    rotation: "rotate-2",
    borderColor: "border-pink-500",
  },
  {
    id: 5,
    title: "Spicy Kick 🌶️",
    description: "Add jalapeño slices, salt rim",
    prepTime: "4 min",
    servings: "1",
    difficulty: "Medium",
    gradient: "from-red-400 to-orange-600",
    rotation: "-rotate-2",
    borderColor: "border-red-500",
  },
  {
    id: 6,
    title: "Berry Blast 🍓",
    description: "Muddle fresh berries, top with Strawberry flavor",
    prepTime: "5 min",
    servings: "1",
    difficulty: "Easy",
    gradient: "from-rose-400 to-red-500",
    rotation: "rotate-1",
    borderColor: "border-rose-500",
  },
  {
    id: 7,
    title: "Tropical Paradise 🌴",
    description: "Mix with pineapple juice and coconut water",
    prepTime: "3 min",
    servings: "2",
    difficulty: "Easy",
    gradient: "from-amber-400 to-yellow-500",
    rotation: "-rotate-1",
    borderColor: "border-amber-500",
  },
  {
    id: 8,
    title: "Garden Fresh 🌿",
    description: "Mint, cucumber, lime - so refreshing!",
    prepTime: "6 min",
    servings: "1",
    difficulty: "Medium",
    gradient: "from-emerald-400 to-teal-500",
    rotation: "rotate-2",
    borderColor: "border-emerald-500",
  },
  {
    id: 9,
    title: "Sunset Sipper 🌅",
    description: "Layered fruit juices create a beautiful gradient",
    prepTime: "7 min",
    servings: "2",
    difficulty: "Hard",
    gradient: "from-orange-400 via-pink-500 to-purple-600",
    rotation: "-rotate-2",
    borderColor: "border-orange-500",
  },
];

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden rainbow-gradient">
        {/* Floating Duckies */}
        <motion.div
          className="absolute text-6xl opacity-20"
          style={{ top: "10%", left: "5%" }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🦆
        </motion.div>
        <motion.div
          className="absolute text-6xl opacity-20"
          style={{ top: "20%", right: "10%" }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          🍹
        </motion.div>
        <motion.div
          className="absolute text-6xl opacity-20"
          style={{ bottom: "10%", left: "15%" }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          🍓
        </motion.div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-black text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            DUCKY DRINK RECIPES 🍹
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover delicious ways to enjoy our non-alcoholic beverages!
          </motion.p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-16 h-16 text-lg rounded-full border-4 border-foreground shadow-lg focus-visible:ring-4 focus-visible:ring-primary"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                className={`${recipe.rotation} hover:rotate-0 transition-all duration-300`}
              >
                <div
                  className={`bg-white rounded-2xl border-4 ${recipe.borderColor} shadow-2xl p-6 space-y-4`}
                >
                  {/* Image Placeholder */}
                  <div
                    className={`w-full h-48 rounded-lg bg-gradient-to-br ${recipe.gradient} flex items-center justify-center text-6xl`}
                  >
                    🍹
                  </div>

                  {/* Recipe Info */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {recipe.title}
                    </h3>
                    <p className="text-muted-foreground">{recipe.description}</p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="w-4 h-4" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>

                  {/* View Button */}
                  <Button className="w-full" size="lg">
                    VIEW RECIPE 🦆
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-2xl text-muted-foreground">
                No recipes found. Try a different search! 🦆
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-black text-primary-foreground">
              GOT A GREAT RECIPE? 🦆
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Share your creation and get featured!
            </p>
            <Button variant="secondary" size="lg" className="text-xl px-8 py-6">
              SUBMIT YOUR RECIPE 🦆
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Recipes;
