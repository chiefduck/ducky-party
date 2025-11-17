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
      
      <main className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link to="/blog">
          <Button variant="outline" className="mb-8 font-bold border-2">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-4 text-base py-1 px-4">
            {article.category}
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-foreground">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-foreground/70 font-bold">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(article.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {article.readTime}
            </span>
          </div>

          {/* Share Button */}
          <Button variant="outline" className="mb-8 font-bold border-2">
            <Share2 className="mr-2 w-4 h-4" /> Share Article
          </Button>

          {/* Featured Image */}
          <div className="aspect-video bg-primary/20 border-4 border-foreground rounded-3xl mb-12 flex items-center justify-center">
            <span className="text-9xl">🦆</span>
          </div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div 
              className="text-foreground space-y-6 font-bold text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: article.content
                  .replace(/^# /gm, '<h1 class="text-5xl font-black mb-6 mt-12 text-foreground">')
                  .replace(/\n# /g, '</h1>\n<h1 class="text-5xl font-black mb-6 mt-12 text-foreground">')
                  .replace(/^## /gm, '<h2 class="text-4xl font-black mb-4 mt-8 text-foreground">')
                  .replace(/\n## /g, '</h2>\n<h2 class="text-4xl font-black mb-4 mt-8 text-foreground">')
                  .replace(/^### /gm, '<h3 class="text-3xl font-black mb-3 mt-6 text-primary">')
                  .replace(/\n### /g, '</h3>\n<h3 class="text-3xl font-black mb-3 mt-6 text-primary">')
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary">$1</strong>')
                  .replace(/\n\n/g, '</p><p class="mb-4">')
                  .replace(/^(?!<[h|p])/gm, '<p class="mb-4">')
                  .replace(/(?<!>)$/gm, '</p>')
              }}
            />
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 p-8 bg-secondary/10 border-4 border-foreground rounded-3xl"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 border-4 border-foreground flex items-center justify-center text-4xl">
                🦆
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2 text-foreground">
                  {article.author}
                </h3>
                <p className="font-bold text-foreground/70">
                  Part of the Rubber Ducky Drink Co. flock, spreading refreshment and good vibes one article at a time!
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
          className="mt-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-center text-foreground">
            MORE FROM THE BLOG 🦆
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {relatedArticles.map((related) => (
              <Link key={related.id} to={`/blog/${related.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-secondary/10 border-4 border-foreground rounded-3xl overflow-hidden h-full flex flex-col"
                >
                  <div className="aspect-video bg-primary/20 flex items-center justify-center border-b-4 border-foreground">
                    <span className="text-6xl">🦆</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <Badge className="w-fit mb-3">
                      {related.category}
                    </Badge>
                    <h3 className="text-xl font-black mb-3 text-foreground">
                      {related.title}
                    </h3>
                    <p className="text-sm font-bold text-foreground/70 flex-grow">
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
