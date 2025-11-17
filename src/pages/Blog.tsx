import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { articles } from "@/data/articles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Blog() {
  const categories = Array.from(new Set(articles.map(a => a.category)));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="text-8xl mb-6 bounce-float">📝</div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-foreground">
            DUCKY BLOG
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-foreground/80 max-w-3xl mx-auto">
            Stories, recipes, and refreshing insights from the flock
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Badge variant="default" className="text-lg py-2 px-6 cursor-pointer">
            All Posts
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="text-lg py-2 px-6 cursor-pointer border-2 hover:bg-primary hover:text-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Link to={`/blog/${articles[0].id}`}>
            <div className="bg-primary/10 border-4 border-foreground rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-video md:aspect-auto bg-secondary/20 flex items-center justify-center">
                  <span className="text-8xl">🦆</span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 text-base py-1 px-4">
                    Featured ⭐
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
                    {articles[0].title}
                  </h2>
                  <p className="text-xl font-bold text-foreground/70 mb-6">
                    {articles[0].excerpt}
                  </p>
                  <div className="flex flex-wrap gap-4 text-foreground/60 font-bold mb-6">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {articles[0].author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(articles[0].date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {articles[0].readTime}
                    </span>
                  </div>
                  <Button size="lg" className="w-fit font-black text-lg">
                    Read Article <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Article Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.slice(1).map((article, index) => (
            <Link key={article.id} to={`/blog/${article.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="bg-secondary/10 border-4 border-foreground rounded-3xl overflow-hidden h-full flex flex-col"
              >
                <div className="aspect-video bg-primary/20 flex items-center justify-center border-b-4 border-foreground">
                  <span className="text-6xl">🦆</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <Badge className="w-fit mb-3">
                    {article.category}
                  </Badge>
                  <h3 className="text-2xl font-black mb-3 text-foreground">
                    {article.title}
                  </h3>
                  <p className="font-bold text-foreground/70 mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-foreground/60 font-bold mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full font-black border-2">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-primary/20 border-4 border-foreground rounded-3xl p-12"
        >
          <div className="text-6xl mb-4">📬</div>
          <h2 className="text-4xl font-black mb-4 text-foreground">
            NEVER MISS A POST!
          </h2>
          <p className="text-xl font-bold text-foreground/70 mb-6">
            Get the latest articles, recipes, and ducky wisdom delivered to your inbox
          </p>
          <Button size="lg" className="font-black text-xl">
            Subscribe to Blog Updates
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
