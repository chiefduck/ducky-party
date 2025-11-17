import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Package, CreditCard, Truck, RefreshCw, Store } from "lucide-react";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    icon: Package,
    title: "Products",
    questions: [
      {
        q: "What flavors do you offer?",
        a: "We currently offer our Classic Lemon-Lime flavor, with exciting new flavors coming soon! Each flavor is crafted with natural ingredients for maximum refreshment. Stay tuned to our social media for flavor drop announcements!"
      },
      {
        q: "Are Rubber Ducky drinks healthy?",
        a: "Our drinks are made with natural flavors and real ingredients. Each can contains no artificial colors or preservatives. While they do contain natural sugars, we believe in transparency - full nutritional information is on every can and our product pages!"
      },
      {
        q: "Are your drinks caffeinated?",
        a: "Currently, our Classic Lemon-Lime flavor is caffeine-free, making it perfect for any time of day! We're exploring caffeinated options for future releases based on customer demand."
      },
      {
        q: "What's the shelf life of your products?",
        a: "Our drinks have a 12-month shelf life from production date. The best-by date is printed on the bottom of each can. For optimal flavor, store in a cool, dry place and refrigerate before enjoying!"
      },
      {
        q: "Are Rubber Ducky drinks vegan/gluten-free?",
        a: "Yes! All our drinks are 100% vegan and gluten-free. We're committed to making refreshment accessible to everyone, regardless of dietary restrictions."
      }
    ]
  },
  {
    icon: CreditCard,
    title: "Orders & Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and digital payment methods through our secure Shopify checkout. All transactions are encrypted for your safety!"
      },
      {
        q: "Can I modify or cancel my order?",
        a: "You can modify or cancel your order within 2 hours of placing it by contacting our customer service team. After that, your order is likely already being prepared for shipment! Email us at orders@rubberduckydrink.com ASAP."
      },
      {
        q: "Do you offer bulk or wholesale pricing?",
        a: "Yes! We have special pricing for bulk orders and wholesale partners. Visit our Wholesale page to submit an application, or contact wholesale@rubberduckydrink.com for more information."
      },
      {
        q: "Will I receive an order confirmation?",
        a: "Absolutely! You'll receive an email confirmation immediately after placing your order, followed by a shipping confirmation with tracking number once your order ships."
      },
      {
        q: "Can I use multiple discount codes?",
        a: "Currently, only one discount code can be applied per order. If you have multiple codes, use the one that gives you the best savings!"
      }
    ]
  },
  {
    icon: Truck,
    title: "Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Domestic (US) standard shipping takes 3-5 business days. Express shipping (2-3 days) and overnight options are available at checkout. International shipping varies by location (7-20 business days). Check our Shipping Policy for detailed information!"
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer FREE standard shipping on all US orders over $50. For orders under $50, standard shipping is just $5.99. It's a great excuse to stock up! 🦆"
      },
      {
        q: "Do you ship internationally?",
        a: "We ship to most countries worldwide! International shipping rates and delivery times vary by location. Customs duties and taxes are the responsibility of the buyer. See our Shipping Policy for specific countries and rates."
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive a tracking number via email. You can track your package directly on the carrier's website. If your tracking hasn't updated in 3 days, contact us!"
      },
      {
        q: "What if my order arrives damaged?",
        a: "We package everything carefully, but accidents happen! If your order arrives damaged, email us at shipping@rubberduckydrink.com within 48 hours with photos. We'll send a replacement or refund immediately - no questions asked!"
      }
    ]
  },
  {
    icon: RefreshCw,
    title: "Returns & Refunds",
    questions: [
      {
        q: "What's your return policy?",
        a: "We offer 30-day returns on unopened products in original packaging. Products with manufacturing defects can be returned even if opened. Contact returns@rubberduckydrink.com to initiate a return. See our Returns & Refunds page for full details!"
      },
      {
        q: "How do refunds work?",
        a: "Refunds are processed within 5-7 business days after we receive your return. The refund goes back to your original payment method. Note: original shipping fees are non-refundable unless we made an error."
      },
      {
        q: "Can I exchange for a different flavor?",
        a: "Absolutely! We offer free exchanges for different flavors. Just contact us at returns@rubberduckydrink.com and we'll arrange the exchange. We'll even cover return shipping!"
      },
      {
        q: "What if I received the wrong item?",
        a: "Our bad! Contact us immediately at orders@rubberduckydrink.com with your order number. We'll send the correct item right away and provide a prepaid return label for the wrong item."
      },
      {
        q: "Are there any items that can't be returned?",
        a: "Opened/consumed products (unless defective), items past 30 days from delivery, and products from unauthorized retailers cannot be returned. Clearance items are final sale unless defective."
      }
    ]
  },
  {
    icon: Store,
    title: "Where to Buy",
    questions: [
      {
        q: "Where can I buy Rubber Ducky drinks in stores?",
        a: "We're expanding fast! Use our Store Locator to find retailers near you. Currently available in select grocery stores, convenience stores, and specialty beverage shops across the country."
      },
      {
        q: "Can I buy directly from your website?",
        a: "Yes! You can order directly from our online shop for home delivery. We offer both single purchases and subscription options for regular deliveries."
      },
      {
        q: "Do you have a subscription service?",
        a: "Coming soon! We're working on a subscription service that'll deliver your favorite Rubber Ducky drinks right to your door on a regular schedule. Sign up for our newsletter to be notified when it launches!"
      },
      {
        q: "Are you in any restaurants or cafes?",
        a: "We're partnering with select restaurants, cafes, and bars across the country! Check our Store Locator or contact us to suggest a venue where you'd love to see Rubber Ducky drinks."
      }
    ]
  },
  {
    icon: HelpCircle,
    title: "General Questions",
    questions: [
      {
        q: "What makes Rubber Ducky drinks different?",
        a: "We're not just another beverage company! We combine ridiculously refreshing natural flavors with maximalist branding that's impossible to ignore. Plus, we're committed to sustainability, transparency, and making every sip an experience. Oh, and rubber ducks. Lots of rubber ducks. 🦆"
      },
      {
        q: "Are you hiring?",
        a: "We're always looking for passionate people to join the flock! Check our About page for current openings or send your resume to careers@rubberduckydrink.com. Let's make refreshment together!"
      },
      {
        q: "How can I become a brand ambassador?",
        a: "Love Rubber Ducky and want to spread the word? Email ambassador@rubberduckydrink.com with info about yourself and why you'd be a great fit. We're looking for enthusiastic folks who embody our wild, fun spirit!"
      },
      {
        q: "Do you sponsor events?",
        a: "We love supporting cool events! For sponsorship inquiries, email events@rubberduckydrink.com with details about your event, expected attendance, and how we can make it ridiculously refreshing together!"
      },
      {
        q: "How can I contact customer service?",
        a: "We're here to help! Email us at hello@rubberduckydrink.com, use our Contact page, or find phone details on the Contact page. We respond to all inquiries within 24 hours on business days. 🦆"
      }
    ]
  }
];

export default function FAQ() {
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
          <div className="text-8xl mb-6 bounce-float">❓</div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-foreground">
            FAQ
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-foreground/80 max-w-3xl mx-auto">
            Got questions? We've got answers! Everything you need to know about Rubber Ducky drinks.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="max-w-5xl mx-auto space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * categoryIndex }}
              className="bg-secondary/10 border-4 border-foreground rounded-3xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 border-4 border-foreground flex items-center justify-center">
                  <category.icon className="w-8 h-8 text-primary" strokeWidth={3} />
                </div>
                <h2 className="text-4xl font-black text-foreground">
                  {category.title}
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.title}-${index}`}
                    className="border-2 border-foreground rounded-2xl overflow-hidden bg-background"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-primary/10 text-left font-black text-lg">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 font-bold text-foreground/80 border-t-2 border-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center bg-primary/20 border-4 border-foreground rounded-3xl p-12 max-w-3xl mx-auto"
        >
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-4xl font-black mb-4 text-foreground">
            STILL HAVE QUESTIONS?
          </h2>
          <p className="text-xl font-bold text-foreground/70 mb-6">
            Can't find what you're looking for? Our support flock is here to help!
          </p>
          <Link to="/contact">
            <Button size="lg" className="font-black text-xl">
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
