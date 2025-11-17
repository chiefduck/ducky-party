import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const badges = [
  "Approved by Cool Moms ✓",
  "Pool Party Certified 🏊",
  "Sober Summer Official ☀️",
  "Gen-Z Approved 💯",
  "Designated Driver's Choice 🚗",
];

const reviews = [
  {
    text: "OMG these slap so hard!! I bring them to EVERY pool party now 🦆",
    author: "Sarah, 24",
    color: "bg-primary",
  },
  {
    text: "Finally a marg that won't ruin my wellness goals. OBSESSED!",
    author: "Mike, 29",
    color: "bg-secondary",
  },
  {
    text: "Best sober drink I've ever had. Period. The vibes are immaculate ✨",
    author: "Jess, 26",
    color: "bg-accent",
  },
  {
    text: "I literally can't tell the difference. This is black magic 🪄",
    author: "Tyler, 31",
    color: "bg-sunshine",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black text-center mb-12 text-foreground"
        >
          AS SEEN ON 📺
        </motion.h2>

        {/* Fake badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 360 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Badge
                className="text-xl px-6 py-3 bg-foreground text-background font-black rounded-full border-4 border-primary shadow-lg"
              >
                {badge}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Reviews */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-black text-center mb-12 text-foreground"
        >
          WHAT THE FLOCK IS SAYING 💬
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${review.color} p-8 rounded-3xl shadow-xl border-4 border-foreground relative`}
              style={{
                transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
              }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-foreground text-foreground" />
                ))}
              </div>
              <p className="text-2xl font-bold text-foreground mb-4">
                "{review.text}"
              </p>
              <p className="text-xl font-black text-foreground/80">
                — {review.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
