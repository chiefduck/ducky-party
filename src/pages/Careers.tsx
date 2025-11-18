import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, Users, Heart, Zap, Coffee, Mail, Loader2 } from "lucide-react";
import { submitToMake } from "@/lib/formSubmit";
import { toast } from "sonner";


const benefits = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance plus wellness stipends"
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    title: "Unlimited Drinks",
    description: "Free Rubber Ducky drinks for you and your friends (obviously!)"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Flexible Work",
    description: "Hybrid and remote options with flexible hours"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Events",
    description: "Regular team outings, happy hours, and company retreats"
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: "Competitive Pay",
    description: "Market-leading salaries plus equity options for early team members"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Time Off",
    description: "Generous PTO, paid holidays, and your birthday off"
  }
];

export default function Careers() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) {
      console.log('Spam detected - submission blocked');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitToMake('career-notify', {
        email,
        timestamp: new Date().toISOString()
      });

      if (result.success) {
        setSubmitted(true);
        setEmail("");
        toast.success("You're on the list!");

        // Reset after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-foreground">
            JOIN THE TEAM
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-foreground/80 max-w-3xl mx-auto">
            Help us build the future of non-alcoholic beverages
          </p>
        </motion.div>

        {/* Culture Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl border-4 border-foreground p-12">
            <h2 className="text-4xl font-black mb-6 text-foreground">Our Culture</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-black mb-3 text-primary">Bold & Creative</h3>
                <p className="text-lg text-foreground/70">
                  We celebrate big ideas and aren't afraid to try new things. Creativity is in our DNA.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-3 text-primary">Inclusive & Fun</h3>
                <p className="text-lg text-foreground/70">
                  We're building a team that reflects our diverse customer base. Everyone has a voice here.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-3 text-primary">Mission-Driven</h3>
                <p className="text-lg text-foreground/70">
                  We're on a mission to make great drinks accessible to everyone, alcohol-free.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-black mb-12 text-center text-foreground">
            Perks & Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border-4 border-foreground rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-black mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Open Positions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black mb-12 text-center text-foreground">
            Open Positions
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="border-4 border-foreground shadow-xl">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="text-6xl mb-6">🦆</div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 text-foreground">
                  No Current Openings
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  We're not hiring right now, but we're always looking for amazing people!
                  Brand Ambassador positions may be opening soon.
                </p>
                <p className="text-base font-bold text-foreground mb-6">
                  Want to be notified when we have openings?
                </p>

                {!submitted ? (
                  <form onSubmit={handleNotifySubmit} className="space-y-4">
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="absolute left-[-9999px]"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 border-2 text-base h-12"
                        required
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="font-black text-base h-12 px-6"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Notify Me
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-green-50 border-4 border-green-400 rounded-xl p-6">
                    <p className="text-4xl mb-2">🎉</p>
                    <p className="font-bold text-green-800 text-lg">
                      You're on the list!
                    </p>
                    <p className="text-green-700">
                      We'll let you know when positions open up! 🦆
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl border-4 border-foreground p-12 text-center"
        >
          <h2 className="text-4xl font-black mb-4 text-primary-foreground">
            Have Questions?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Curious about working at Rubber Ducky? Send us an email and let's chat!
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="font-black text-lg"
            onClick={() => window.open('mailto:careers@rubberduckydrinkco.com?subject=Career Inquiry', '_blank')}
          >
            Email Us
          </Button>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
