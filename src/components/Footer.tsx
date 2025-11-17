import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Facebook, Mail } from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

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
            <h3 className="text-5xl font-black mb-6">JOIN THE FLOCK</h3>
            <p className="text-2xl mb-8 font-bold">
              Get exclusive drops, wild deals, and questionable duck facts
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => {
              e.preventDefault();
              // TODO: Replace with your Make.com webhook URL
              // const webhookUrl = "YOUR_MAKE_COM_WEBHOOK_URL";
              // const formData = new FormData(e.currentTarget);
              // const email = formData.get('email');
              // 
              // fetch(webhookUrl, {
              //   method: "POST",
              //   headers: { "Content-Type": "application/json" },
              //   body: JSON.stringify({ email }),
              // });
            }}>
              <Input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="flex-1 text-xl py-6 px-6 bg-background text-foreground border-4 border-background rounded-full font-bold"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-foreground font-black text-xl py-6 px-12 rounded-full border-4 border-background shadow-lg"
              >
                QUACK ME IN
              </Button>
            </form>
          </motion.div>

          {/* Social icons */}
          <div className="flex justify-center gap-6 mb-12">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: TikTokIcon, label: "TikTok" },
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
              <a href="/careers" className="hover:text-primary transition-colors">
                Careers
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
              © 2024 Rubber Ducky Drink Co. All rights reserved.
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
