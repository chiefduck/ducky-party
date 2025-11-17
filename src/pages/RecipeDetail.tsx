import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, ChefHat, Star } from "lucide-react";
import { motion } from "framer-motion";
import { recipes } from "@/data/recipes";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Recipe Not Found 🦆</h1>
          <Button onClick={() => navigate("/recipes")}>Back to Recipes</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/recipes")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${recipe.gradient} flex items-center justify-center text-9xl border-4 ${recipe.borderColor} shadow-2xl`}
              >
                🍹
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-black text-foreground">
                {recipe.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {recipe.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Prep Time</div>
                    <div className="font-bold">{recipe.prepTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Servings</div>
                    <div className="font-bold">{recipe.servings}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Difficulty</div>
                    <div className="font-bold">{recipe.difficulty}</div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 p-4 bg-muted rounded-xl border-2 border-border">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(recipe.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div>
                  <div className="font-bold text-lg">{recipe.rating} / 5</div>
                  <div className="text-sm text-muted-foreground">
                    {recipe.reviews} reviews
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ingredients & Instructions */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-background rounded-2xl border-4 border-primary p-6 shadow-xl sticky top-8">
                <h2 className="text-3xl font-black mb-6 text-foreground">
                  Ingredients 🛒
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-foreground"
                    >
                      <span className="text-primary text-xl">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-background rounded-2xl border-4 border-secondary p-6 shadow-xl">
                <h2 className="text-3xl font-black mb-6 text-foreground">
                  Instructions 👨‍🍳
                </h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <span className="flex-1 pt-1 text-foreground">
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nutritional Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-background rounded-2xl border-4 border-accent p-6 shadow-xl">
              <h2 className="text-3xl font-black mb-6 text-foreground text-center">
                Nutritional Information 📊
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center p-4 bg-muted rounded-xl">
                  <div className="text-3xl font-black text-primary">
                    {recipe.nutritionalInfo.calories}
                  </div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-xl">
                  <div className="text-3xl font-black text-primary">
                    {recipe.nutritionalInfo.sugar}
                  </div>
                  <div className="text-sm text-muted-foreground">Sugar</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-xl">
                  <div className="text-3xl font-black text-primary">
                    {recipe.nutritionalInfo.carbs}
                  </div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-xl">
                  <div className="text-3xl font-black text-primary">
                    {recipe.nutritionalInfo.protein}
                  </div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-xl">
                  <div className="text-3xl font-black text-primary">
                    {recipe.nutritionalInfo.sodium}
                  </div>
                  <div className="text-sm text-muted-foreground">Sodium</div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                * Per serving. Values are approximate and may vary based on
                specific ingredients used.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Reviews CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-black text-primary-foreground">
              Tried This Recipe? 🦆
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Share your experience and help other Ducky fans make the perfect
              drink!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-xl px-8 py-6">
                RATE THIS RECIPE ⭐
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-8 py-6 bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20"
              >
                SHARE YOUR PHOTO 📸
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RecipeDetail;
