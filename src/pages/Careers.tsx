import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Users, Heart, Zap, Coffee } from "lucide-react";

const positions = [
  {
    id: 1,
    title: "Senior Flavor Scientist",
    department: "Product Development",
    location: "Portland, OR",
    type: "Full-time",
    salary: "$90k - $120k",
    description: "Lead our flavor innovation team to create the next generation of non-alcoholic beverages. You'll experiment with natural ingredients and push the boundaries of taste.",
    requirements: [
      "5+ years experience in food science or flavor development",
      "Deep knowledge of natural flavoring and beverage formulation",
      "Experience with regulatory compliance (FDA, organic certifications)",
      "Passion for creating innovative products"
    ]
  },
  {
    id: 2,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote (US)",
    type: "Full-time",
    salary: "$80k - $100k",
    description: "Drive our brand strategy and lead campaigns that make people smile. You'll own our social media presence, influencer partnerships, and brand positioning.",
    requirements: [
      "3+ years experience in consumer brand marketing",
      "Strong social media and content creation skills",
      "Experience with DTC brands preferred",
      "Creative mindset with data-driven approach"
    ]
  },
  {
    id: 3,
    title: "Sales Representative",
    department: "Sales",
    location: "Multiple Locations",
    type: "Full-time",
    salary: "$60k - $80k + Commission",
    description: "Build relationships with retailers and expand our distribution network. You'll be the face of Rubber Ducky in your region.",
    requirements: [
      "2+ years experience in CPG or beverage sales",
      "Existing retail relationships preferred",
      "Strong negotiation and presentation skills",
      "Self-motivated and results-driven"
    ]
  },
  {
    id: 4,
    title: "Production Coordinator",
    department: "Operations",
    location: "Portland, OR",
    type: "Full-time",
    salary: "$55k - $70k",
    description: "Ensure our production runs smoothly and efficiently. You'll coordinate with manufacturers, manage inventory, and maintain quality standards.",
    requirements: [
      "2+ years in production or operations",
      "Experience with beverage manufacturing preferred",
      "Strong organizational and communication skills",
      "Detail-oriented problem solver"
    ]
  }
];

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
          <div className="space-y-6 max-w-5xl mx-auto">
            {positions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-4 border-foreground hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl font-black mb-2">
                          {position.title}
                        </CardTitle>
                        <CardDescription className="text-lg font-bold">
                          {position.department}
                        </CardDescription>
                      </div>
                      <Badge className="text-sm font-bold">
                        {position.type}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4 text-sm font-bold text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {position.salary}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-foreground/80 mb-4">
                      {position.description}
                    </p>
                    
                    <div>
                      <h4 className="font-black mb-2">Requirements:</h4>
                      <ul className="space-y-1 text-sm text-foreground/70">
                        {position.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full font-black text-lg"
                      onClick={() => window.open(`mailto:careers@rubberduckydrink.com?subject=Application: ${position.title}`, '_blank')}
                    >
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
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
            Don't See Your Perfect Role?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and let us know what makes you special!
          </p>
          <Button 
            variant="secondary"
            size="lg"
            className="font-black text-lg"
            onClick={() => window.open('mailto:careers@rubberduckydrink.com?subject=General Application', '_blank')}
          >
            Send Us Your Resume
          </Button>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
