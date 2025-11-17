import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Wavy divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#FFF8E7"
          />
        </svg>
      </div>

      <div className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-8xl mb-6 bounce-float">🦆</div>
            <h3 className="text-5xl font-black mb-6">JOIN THE FLOCK 🦆</h3>
            <p className="text-2xl mb-8 font-bold">
              Get exclusive drops, wild deals, and questionable duck facts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 text-xl py-6 px-6 bg-background text-foreground border-4 border-background rounded-full font-bold"
              />
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-foreground font-black text-xl py-6 px-12 rounded-full border-4 border-background shadow-lg"
              >
                QUACK ME IN
              </Button>
            </div>
          </motion.div>

          {/* Social icons */}
          <div className="flex justify-center gap-6 mb-12">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Twitter, label: "Twitter" },
              { icon: Facebook, label: "Facebook" },
              { icon: Mail, label: "Email" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-primary text-foreground p-4 rounded-full border-4 border-background shadow-lg hover:bg-secondary"
                aria-label={social.label}
              >
                <social.icon className="w-8 h-8" strokeWidth={3} />
              </motion.a>
            ))}
          </div>

          {/* Footer links */}
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-lg font-bold mb-4">
              <a href="/about" className="hover:text-primary transition-colors">
                About Us
              </a>
              <a href="/shop" className="hover:text-primary transition-colors">
                Shop
              </a>
              <a href="/blog" className="hover:text-primary transition-colors">
                Blog
              </a>
              <a href="/faq" className="hover:text-primary transition-colors">
                FAQ
              </a>
              <a href="/store-locator" className="hover:text-primary transition-colors">
                Store Locator
              </a>
              <a href="/contact" className="hover:text-primary transition-colors">
                Contact
              </a>
              <a href="/wholesale" className="hover:text-primary transition-colors">
                Wholesale
              </a>
              <a href="/press-kit" className="hover:text-primary transition-colors">
                Press Kit
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold opacity-75">
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/returns" className="hover:text-primary transition-colors">
                Returns & Refunds
              </a>
              <a href="/shipping" className="hover:text-primary transition-colors">
                Shipping Policy
              </a>
            </div>
            <p className="text-sm opacity-75">
              © 2024 Rubber Ducky Drink Co. All rights reserved. 🦆
            </p>
            <p className="text-xs opacity-50">
              Made with chaos and love by the Rubber Ducky team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
