import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import productClassic from "@/assets/product-classic.png";

const products = [
  {
    id: 1,
    name: "Classic Lime",
    image: productClassic,
    color: "border-secondary",
    rotate: -3,
    available: true,
  },
  {
    id: 2,
    name: "Watermelon Jalapeño",
    image: productClassic,
    color: "border-primary",
    rotate: 2,
    available: true,
  },
  {
    id: 3,
    name: "Strawberry",
    image: productClassic,
    color: "border-accent",
    rotate: -2,
    available: true,
  },
];

const comingSoon = [
  { name: "Passionfruit Guava", color: "border-sunshine" },
  { name: "Tropical", color: "border-primary" },
  { name: "Blueberry Mint", color: "border-secondary" },
];

export const ProductSection = () => {
  const [selectedPackSize, setSelectedPackSize] = useState<"4-pack" | "12-pack">("4-pack");
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem, setIsCartOpen } = useCartStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts(20);
        setShopifyProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (shopifyProduct: ShopifyProduct) => {
    // Find variant based on selected pack size
    const variantIndex = selectedPackSize === "4-pack" ? 1 : 2;
    const selectedVariant = shopifyProduct.node.variants.edges[variantIndex]?.node || shopifyProduct.node.variants.edges[0].node;
    
    const cartItem: CartItem = {
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
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

    toast.success("Added to cart!", {
      description: `${shopifyProduct.node.title} ${selectedVariant.title} added to your cart`,
    });

    // Open the cart drawer
    setIsCartOpen(true);
  };

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-7xl md:text-9xl font-black text-center mb-20 text-foreground"
          style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
        >
          THE FLOCK
        </motion.h2>

        {/* Product Grid - Polaroid Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {isLoading ? (
            <div className="col-span-full text-center text-muted-foreground">Loading products...</div>
          ) : shopifyProducts.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">No products found</div>
          ) : (
            shopifyProducts.slice(0, 3).map((shopifyProduct, i) => (
              <motion.div
                key={shopifyProduct.node.id}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: [-3, 2, -2][i] || 0 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-6 pb-12 shadow-2xl border-8 cursor-pointer ${["border-secondary", "border-primary", "border-accent"][i] || "border-foreground"}`}
                style={{
                  boxShadow: "8px 8px 0px rgba(0,0,0,0.2)",
                }}
              >
                <div className="bg-muted aspect-square flex items-center justify-center mb-6 overflow-hidden relative">
                  {shopifyProduct.node.images.edges[0]?.node ? (
                    <img
                      src={shopifyProduct.node.images.edges[0].node.url}
                      alt={shopifyProduct.node.title}
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <img
                      src={productClassic}
                      alt={shopifyProduct.node.title}
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4 text-center">
                  {shopifyProduct.node.title}
                </h3>
                
                {/* Pack Size Selector */}
                {shopifyProduct.node.variants.edges.length > 1 && (
                  <div className="flex gap-2 mb-4">
                    {shopifyProduct.node.variants.edges.slice(1, 3).map((variant, idx) => (
                      <Button
                        key={variant.node.id}
                        variant={selectedPackSize === (idx === 0 ? "4-pack" : "12-pack") ? "default" : "outline"}
                        onClick={() => setSelectedPackSize(idx === 0 ? "4-pack" : "12-pack")}
                        className="flex-1 font-bold border-2 border-foreground"
                      >
                        {variant.node.title}
                        <br />
                        ${parseFloat(variant.node.price.amount).toFixed(2)}
                      </Button>
                    ))}
                  </div>
                )}

                <Button
                  onClick={() => handleAddToCart(shopifyProduct)}
                  className="w-full gap-2 font-bold text-lg py-6 border-4 border-foreground shadow-lg hover:scale-105 transition-transform"
                  disabled={!shopifyProduct.node.variants.edges[0].node.availableForSale}
                >
                  Grab It
                </Button>
              </motion.div>
            ))
          )}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-5xl font-black text-foreground mb-8">
            COMING SOON 🎉
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {comingSoon.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className={`bg-muted ${item.color} border-4 px-8 py-4 rounded-full font-black text-2xl shadow-lg`}
                style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
              >
                {item.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
