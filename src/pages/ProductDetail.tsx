import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Sparkles, 
  Leaf, 
  Droplets, 
  Award,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts(100);
        const foundProduct = products.find(p => p.node.handle === handle);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const selectedVariant = product.node.variants.edges[selectedVariantIndex].node;
    
    const cartItem: CartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    
    // Confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF6B9D", "#FFD93D", "#6BCB77", "#00D9FF"],
    });
    
    toast.success("Added to cart! 🦆", {
      description: `${quantity}x ${product.node.title} added to your cart`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found 🦆</h1>
          <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.node.variants.edges[selectedVariantIndex].node;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 pt-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/shop")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Button>
      </div>

      {/* Hero Section - Product Showcase */}
      <section className="py-12 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 relative overflow-hidden">
        {/* Floating Duckies */}
        <motion.div
          className="absolute text-6xl opacity-10 top-10 right-10"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🦆
        </motion.div>
        <motion.div
          className="absolute text-6xl opacity-10 bottom-10 left-10"
          animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          🍹
        </motion.div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-foreground shadow-2xl relative group">
                {product.node.images.edges[0]?.node ? (
                  <img
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.images.edges[0].node.altText || product.node.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl animate-bounce">
                    🦆
                  </div>
                )}
                
                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-4 left-4"
                >
                  <Badge className="text-lg px-4 py-2 bg-secondary border-2 border-foreground">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Zero Sugar
                  </Badge>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute top-4 right-4"
                >
                  <Badge className="text-lg px-4 py-2 bg-primary border-2 border-foreground">
                    <Leaf className="w-4 h-4 mr-2" />
                    All Natural
                  </Badge>
                </motion.div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <Button variant="outline" size="icon" className="border-2">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-2">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
                  {product.node.title}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-primary">
                    {selectedVariant.price.currencyCode}{' '}
                    {parseFloat(selectedVariant.price.amount).toFixed(2)}
                  </span>
                  {selectedVariant.title !== "Default Title" && (
                    <span className="text-lg text-muted-foreground">
                      per {selectedVariant.title}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {product.node.description || "A refreshing non-alcoholic beverage from Rubber Ducky Drink Co!"}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y-2 border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-1 text-primary" />
                  <p className="text-xs font-bold">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Orders $50+</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-1 text-primary" />
                  <p className="text-xs font-bold">Secure</p>
                  <p className="text-xs text-muted-foreground">100% Safe</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-6 h-6 mx-auto mb-1 text-primary" />
                  <p className="text-xs font-bold">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30 Days</p>
                </div>
              </div>

              {/* Variant Selection */}
              {product.node.variants.edges.length > 1 && (
                <div className="space-y-3">
                  <Label className="text-sm font-bold uppercase tracking-wider">
                    Choose Your Size
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {product.node.variants.edges.map((variant, index) => (
                      <Button
                        key={variant.node.id}
                        variant={selectedVariantIndex === index ? "default" : "outline"}
                        onClick={() => setSelectedVariantIndex(index)}
                        disabled={!variant.node.availableForSale}
                        className="border-2 h-auto py-4 flex flex-col gap-1"
                      >
                        <span className="font-bold">{variant.node.title}</span>
                        <span className="text-xs">
                          ${parseFloat(variant.node.price.amount).toFixed(2)}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-bold uppercase tracking-wider">Quantity</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-foreground rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-r-none"
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <span className="text-2xl font-black w-16 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-l-none"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  {quantity > 1 && (
                    <span className="text-muted-foreground">
                      Total: ${(parseFloat(selectedVariant.price.amount) * quantity).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full gap-2 h-14 text-lg font-black border-4 border-foreground shadow-lg hover:scale-105 transition-transform"
                size="lg"
                disabled={!selectedVariant.availableForSale}
              >
                <ShoppingCart className="w-6 h-6" />
                {selectedVariant.availableForSale ? "ADD TO CART 🦆" : "OUT OF STOCK"}
              </Button>

              {!selectedVariant.availableForSale && (
                <p className="text-sm text-center text-muted-foreground">
                  This variant is currently unavailable
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
              WHY YOU'LL LOVE IT 🦆
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Zero Sugar",
                  description: "All the flavor, none of the guilt. Sweetened naturally!",
                  color: "from-yellow-400 to-orange-500"
                },
                {
                  icon: <Leaf className="w-8 h-8" />,
                  title: "Natural Ingredients",
                  description: "Real fruit extracts and natural flavors only.",
                  color: "from-green-400 to-emerald-500"
                },
                {
                  icon: <Droplets className="w-8 h-8" />,
                  title: "Ultra Refreshing",
                  description: "Perfectly carbonated for maximum refreshment.",
                  color: "from-blue-400 to-cyan-500"
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Award Winning",
                  description: "Loved by mocktail enthusiasts everywhere!",
                  color: "from-pink-400 to-rose-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  className="bg-card border-4 border-foreground rounded-xl p-6 shadow-lg"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto p-2 border-2 border-foreground">
                <TabsTrigger value="description" className="text-lg font-bold py-3">
                  Description
                </TabsTrigger>
                <TabsTrigger value="ingredients" className="text-lg font-bold py-3">
                  Ingredients
                </TabsTrigger>
                <TabsTrigger value="howto" className="text-lg font-bold py-3">
                  How to Enjoy
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6 space-y-4">
                <div className="bg-background rounded-xl border-4 border-foreground p-8">
                  <h3 className="text-2xl font-black mb-4">About This Drink</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.node.description || "A refreshing non-alcoholic beverage from Rubber Ducky Drink Co! Perfect for any occasion, our drinks are crafted with care to deliver maximum flavor and refreshment."}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Whether you're hosting a party, relaxing by the pool, or just want something delicious to sip on, Rubber Ducky drinks are your perfect companion. Zero alcohol means you can enjoy them anytime, anywhere!
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="ingredients" className="mt-6">
                <div className="bg-background rounded-xl border-4 border-foreground p-8">
                  <h3 className="text-2xl font-black mb-4">What's Inside</h3>
                  <ul className="space-y-2 text-lg">
                    <li className="flex items-center gap-2">
                      <span className="text-primary text-2xl">•</span>
                      <span>Carbonated Water</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary text-2xl">•</span>
                      <span>Natural Lime Flavor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary text-2xl">•</span>
                      <span>Citric Acid</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary text-2xl">•</span>
                      <span>Natural Sweeteners</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary text-2xl">•</span>
                      <span>A Splash of Magic ✨</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-bold">Nutrition Facts (per 12 fl oz):</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <span>Calories: 10</span>
                      <span>Sugar: 0g</span>
                      <span>Carbs: 2g</span>
                      <span>Sodium: 15mg</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="howto" className="mt-6">
                <div className="bg-background rounded-xl border-4 border-foreground p-8">
                  <h3 className="text-2xl font-black mb-6">Serving Suggestions 🍹</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-bold text-lg mb-2">Classic Pour</h4>
                      <p className="text-muted-foreground">
                        Serve chilled over ice in your favorite glass. Garnish with a lime wedge for extra flair!
                      </p>
                    </div>
                    <div className="border-l-4 border-secondary pl-4">
                      <h4 className="font-bold text-lg mb-2">Frozen Delight</h4>
                      <p className="text-muted-foreground">
                        Blend with ice for a slushy treat. Perfect for hot summer days!
                      </p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-bold text-lg mb-2">Mocktail Magic</h4>
                      <p className="text-muted-foreground">
                        Mix with sparkling water and fresh fruit for a fancy mocktail experience.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg border-2 border-primary">
                    <p className="text-sm font-bold text-center">
                      💡 Pro Tip: Add a salt rim for the full margarita experience!
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-accent to-secondary relative overflow-hidden">
        <motion.div
          className="absolute text-9xl opacity-20"
          style={{ top: "20%", right: "10%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          🦆
        </motion.div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-6xl font-black text-primary-foreground">
              READY TO QUACK UP? 🦆
            </h2>
            <p className="text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Join the flock and taste the best non-alcoholic margaritas around!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-xl px-8 py-6 font-black border-4 border-foreground shadow-2xl"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-6 h-6 mr-2" />
                ADD TO CART NOW
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-8 py-6 font-black border-4 border-foreground bg-background/10 backdrop-blur-sm hover:bg-background/20"
                onClick={() => navigate("/shop")}
              >
                BROWSE MORE FLAVORS
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);

export default ProductDetail;
