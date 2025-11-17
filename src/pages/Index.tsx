import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { FeaturesBento } from "@/components/FeaturesBento";
import { ValuePropositions } from "@/components/ValuePropositions";
import { HowItsMade } from "@/components/HowItsMade";
import { SocialProof } from "@/components/SocialProof";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Confetti burst on page load
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#FF6B9D", "#FFD93D", "#6BCB77", "#00D9FF"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#FF6B9D", "#FFD93D", "#6BCB77", "#00D9FF"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductSection />
      <FeaturesBento />
      <ValuePropositions />
      <HowItsMade />
      <SocialProof />
      <Footer />
    </div>
  );
};

export default Index;
