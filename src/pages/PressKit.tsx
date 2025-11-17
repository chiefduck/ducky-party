import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, FileText, Image, Mail } from "lucide-react";
import logo from "@/assets/logo.svg";
import productImage from "@/assets/product-classic.png";

export default function PressKit() {
  const downloadAsset = (assetName: string) => {
    console.log(`Downloading ${assetName}...`);
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
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-foreground">
            PRESS & MEDIA KIT 📰
          </h1>
          <p className="text-xl font-bold text-foreground/70 max-w-3xl mx-auto">
            Everything you need to feature Rubber Ducky Drink Co. Download our logos, product photos, and company information.
          </p>
        </motion.div>

        {/* Quick Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16 bg-primary/10 border-4 border-foreground rounded-3xl p-8"
        >
          <h2 className="text-3xl font-black mb-4 text-foreground">Quick Download</h2>
          <p className="text-lg font-bold text-foreground/70 mb-6">
            Download our complete media kit with all assets in one package.
          </p>
          <Button 
            size="lg" 
            className="font-black text-lg"
            onClick={() => downloadAsset("complete-media-kit.zip")}
          >
            <Download className="mr-2" /> Download Complete Kit
          </Button>
        </motion.div>

        {/* Company Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black mb-8 text-foreground">Company Information</h2>
          <div className="bg-secondary/10 border-4 border-foreground rounded-3xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-black mb-4 text-primary">About Us</h3>
                <p className="font-bold text-foreground/70 mb-4">
                  Rubber Ducky Drink Co. is revolutionizing the non-alcoholic beverage industry with our bold, playful approach to refreshment. Founded in 2023, we create drinks that don't just quench your thirst – they make you smile.
                </p>
                <p className="font-bold text-foreground/70">
                  Our mission is to bring joy to every sip while maintaining the highest quality ingredients and sustainability standards.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4 text-primary">Key Facts</h3>
                <ul className="space-y-2 font-bold text-foreground/70">
                  <li>• Founded: 2023</li>
                  <li>• Headquarters: Portland, Oregon</li>
                  <li>• Products: Non-Alcoholic Beverages</li>
                  <li>• Distribution: Nationwide</li>
                  <li>• Sustainability: 100% Recyclable Packaging</li>
                  <li>• Certifications: Organic, Non-GMO</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Brand Assets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black mb-8 text-foreground">Brand Assets</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Logo Pack */}
            <div className="bg-secondary/10 border-4 border-foreground rounded-3xl p-8">
              <div className="aspect-square bg-background border-4 border-foreground rounded-2xl mb-6 flex items-center justify-center">
                <img src={logo} alt="Rubber Ducky Logo" className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-foreground">Logo Pack</h3>
              <p className="font-bold text-foreground/70 mb-4">
                Includes PNG, SVG, and EPS formats in full color, black, and white variations.
              </p>
              <Button 
                variant="outline" 
                className="w-full font-bold border-2"
                onClick={() => downloadAsset("logo-pack.zip")}
              >
                <Download className="mr-2" /> Download Logos
              </Button>
            </div>

            {/* Color Palette */}
            <div className="bg-secondary/10 border-4 border-foreground rounded-3xl p-8">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="aspect-square bg-primary border-4 border-foreground rounded-2xl"></div>
                <div className="aspect-square bg-secondary border-4 border-foreground rounded-2xl"></div>
                <div className="aspect-square bg-accent border-4 border-foreground rounded-2xl"></div>
              </div>
              <h3 className="text-2xl font-black mb-3 text-foreground">Brand Colors</h3>
              <p className="font-bold text-foreground/70 mb-4">
                Official brand color palette with hex codes and usage guidelines.
              </p>
              <Button 
                variant="outline" 
                className="w-full font-bold border-2"
                onClick={() => downloadAsset("brand-colors.pdf")}
              >
                <FileText className="mr-2" /> Download Guide
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Product Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black mb-8 text-foreground">Product Photos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-secondary/10 border-4 border-foreground rounded-3xl p-6">
                <div className="aspect-square bg-background border-4 border-foreground rounded-2xl mb-4 overflow-hidden">
                  <img 
                    src={productImage} 
                    alt="Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-black mb-2 text-foreground">Product Shot {item}</h3>
                <p className="font-bold text-foreground/70 text-sm mb-4">
                  High-resolution product photography
                </p>
                <Button 
                  variant="outline" 
                  className="w-full font-bold border-2"
                  onClick={() => downloadAsset(`product-${item}.jpg`)}
                >
                  <Image className="mr-2 w-4 h-4" /> Download
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Press Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black mb-8 text-foreground">Press Contact</h2>
          <div className="bg-primary/10 border-4 border-foreground rounded-3xl p-8 text-center">
            <Mail className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-black mb-3 text-foreground">Media Inquiries</h3>
            <p className="text-lg font-bold text-foreground/70 mb-6">
              For press inquiries, interviews, or additional assets, please contact our media team.
            </p>
            <div className="space-y-2">
              <p className="font-bold text-foreground">
                Email: <a href="mailto:press@rubberducky.com" className="text-primary hover:underline">press@rubberducky.com</a>
              </p>
              <p className="font-bold text-foreground">
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
        </motion.div>

        {/* Usage Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-black mb-8 text-foreground">Usage Guidelines</h2>
          <div className="bg-secondary/10 border-4 border-foreground rounded-3xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-black mb-4 text-primary">Do's ✓</h3>
                <ul className="space-y-2 font-bold text-foreground/70">
                  <li>• Use official logo files provided</li>
                  <li>• Maintain clear space around logo</li>
                  <li>• Use approved brand colors</li>
                  <li>• Keep proportions intact</li>
                  <li>• Use high-resolution images</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4 text-primary">Don'ts ✗</h3>
                <ul className="space-y-2 font-bold text-foreground/70">
                  <li>• Don't distort or stretch logo</li>
                  <li>• Don't change brand colors</li>
                  <li>• Don't add effects or filters</li>
                  <li>• Don't use low-quality images</li>
                  <li>• Don't alter typography</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
