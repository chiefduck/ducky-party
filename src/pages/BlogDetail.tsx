import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { articles } from "@/data/articles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function BlogDetail() {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = articles.filter(a => a.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Back Button */}
        <Link to="/blog">
          <Button variant="outline" className="mb-6 md:mb-8 font-bold border-2">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-3 md:mb-4 text-sm md:text-base py-1 px-3 md:px-4">
            {article.category}
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 text-foreground leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-6 md:mb-8 text-sm md:text-base text-foreground/70 font-bold">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 md:w-5 md:h-5" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              {new Date(article.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              {article.readTime}
            </span>
          </div>

          {/* Share Button */}
          <Button variant="outline" className="mb-6 md:mb-8 font-bold border-2 text-sm md:text-base">
            <Share2 className="mr-2 w-4 h-4" /> Share Article
          </Button>

          {/* Featured Image */}
          <div className="aspect-video border-4 border-foreground rounded-2xl md:rounded-3xl mb-8 md:mb-12 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-3xl mx-auto"
          >
            <div
              className="text-foreground space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/^# /gm, '<h1 class="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 mt-8 md:mt-10 text-foreground leading-tight">')
                  .replace(/\n# /g, '</h1>\n<h1 class="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 mt-8 md:mt-10 text-foreground leading-tight">')
                  .replace(/^## /gm, '<h2 class="text-xl md:text-2xl lg:text-3xl font-black mb-3 md:mb-4 mt-6 md:mt-8 text-foreground leading-tight">')
                  .replace(/\n## /g, '</h2>\n<h2 class="text-xl md:text-2xl lg:text-3xl font-black mb-3 md:mb-4 mt-6 md:mt-8 text-foreground leading-tight">')
                  .replace(/^### /gm, '<h3 class="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 mt-4 md:mt-6 text-primary leading-tight">')
                  .replace(/\n### /g, '</h3>\n<h3 class="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 mt-4 md:mt-6 text-primary leading-tight">')
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary font-bold">$1</strong>')
                  .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
                  .replace(/^(?!<[h|p])/gm, '<p class="mb-4 leading-relaxed">')
                  .replace(/(?<!>)$/gm, '</p>')
              }}
            />
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 md:mt-16 p-6 md:p-8 bg-secondary/10 border-4 border-foreground rounded-2xl md:rounded-3xl"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 border-4 border-foreground flex items-center justify-center text-3xl md:text-4xl flex-shrink-0">
                👤
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl md:text-2xl font-black mb-2 text-foreground">
                  {article.author}
                </h3>
                <p className="text-sm md:text-base font-bold text-foreground/70">
                  Part of the Rubber Ducky Drink Co. team, spreading refreshment and good vibes one article at a time!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 md:mt-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 md:mb-8 text-center text-foreground">
            MORE FROM THE BLOG
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {relatedArticles.map((related) => (
              <Link key={related.id} to={`/blog/${related.id}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="bg-secondary/10 border-4 border-foreground rounded-2xl md:rounded-3xl overflow-hidden h-full flex flex-col"
                >
                  <div className="aspect-video border-b-4 border-foreground overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <Badge className="w-fit mb-2 md:mb-3 text-xs md:text-sm">
                      {related.category}
                    </Badge>
                    <h3 className="text-lg md:text-xl font-black mb-2 md:mb-3 text-foreground line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-xs md:text-sm font-bold text-foreground/70 flex-grow line-clamp-3">
                      {related.excerpt}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
