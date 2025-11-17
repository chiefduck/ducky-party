import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const valueCards = [
  {
    emoji: "🥭",
    title: "Quality Ingredients",
    description: "Real fruit extracts, natural flavors, and clean ingredients—nothing artificial, no added sugar.",
    gradient: "from-primary via-accent to-secondary",
    rotation: "rotate-[-2deg]",
  },
  {
    emoji: "🤝",
    title: "Inclusivity",
    description: "Everyone deserves something fun in their glass. Whether you're sober, sober-curious, or just skipping alcohol tonight—we've got your back.",
    gradient: "from-secondary via-sunshine to-primary",
    rotation: "rotate-[1deg]",
  },
  {
    emoji: "💼",
    title: "Playful Sophistication",
    description: "Crafted with intention, delivered with a wink. Our drinks are thoughtfully made but never take themselves too seriously.",
    gradient: "from-accent via-primary to-secondary",
    rotation: "rotate-[-1deg]",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-7xl md:text-8xl font-black mb-8 text-background drop-shadow-lg">
            OUR STORY
          </h1>
          <p className="text-2xl md:text-3xl text-background/90 font-bold max-w-4xl mx-auto leading-relaxed">
            Rubber Ducky Drink Co. was born from a simple idea: great drinks should bring joy—even without the booze.
          </p>
        </div>
      </section>

      {/* Why Rubber Ducky Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            
            {/* Left - Text */}
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
                WHY RUBBER DUCKY?
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                The rubber duck is a universal symbol of lightheartedness and fun—just like our drinks. We wanted to can that same carefree feeling: a little wink of nostalgia, a splash of sunshine, and a whole lot of flavor.
              </p>
            </div>

            {/* Right - Product Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl border-4 border-foreground shadow-2xl h-96 flex items-center justify-center rotate-[2deg] hover:rotate-0 transition-all duration-300">
                <div className="text-center">
                  <p className="text-2xl font-black text-background">
                    Product Visual
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-black mb-16 text-center text-foreground">
            WHAT WE'RE ABOUT
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {valueCards.map((card, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${card.gradient} p-8 rounded-3xl border-4 border-foreground shadow-2xl ${card.rotation} hover:rotate-0 hover:scale-105 transition-all duration-300 group`}
              >
                <div className="text-7xl mb-6">
                  {card.emoji}
                </div>
                <h3 className="text-3xl font-black mb-4 text-background">
                  {card.title}
                </h3>
                <p className="text-lg text-background/90 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Craft Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            
            {/* Left - Text */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl border-4 border-foreground shadow-2xl h-96 flex items-center justify-center rotate-[-2deg] hover:rotate-0 transition-all duration-300">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-bounce-float">🥤</div>
                  <p className="text-2xl font-black text-background">
                    Crafting Process
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
                HOW WE CRAFT OUR FLAVOR
              </h2>
              <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
                <p>
                  Every can of Rubber Ducky starts with real ingredients. We obsess over flavor profiles, test countless combinations, and work with expert mixologists to create drinks that taste incredible.
                </p>
                <p>
                  No shortcuts. No artificial sweeteners. No compromise. Just bold, balanced flavors that make you do a double-take when you realize there's no alcohol in your glass.
                </p>
                <p className="text-2xl font-black text-foreground">
                  Because you deserve better than boring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join The Team CTA */}
      <section className="py-24 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-black mb-6 text-background drop-shadow-lg">
              BE PART OF THE FLOCK
            </h2>
            <p className="text-2xl md:text-3xl text-background/90 font-bold mb-12 leading-relaxed">
              We're always looking for passionate people to help shape the future of drinking culture.
            </p>
            
            <div className="inline-block bg-sunshine rounded-2xl border-4 border-foreground shadow-2xl p-4 rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
              <button className="bg-background text-foreground px-12 py-6 rounded-xl text-2xl font-black hover:scale-105 transition-transform duration-200">
                VIEW OPEN POSITIONS 💼
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
