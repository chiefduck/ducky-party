import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

// Colored border rotation: green → blue → pink
const borderColors = [
  'border-lime-400',    // Green - 1st product
  'border-cyan-400',    // Blue - 2nd product
  'border-primary',     // Pink - 3rd product
];

export const ProductSection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem, setIsCartOpen } = useCartStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        console.log('🦆 [ProductSection] Fetching products for "The Flock"');

        // Get all products (fetch more to have options)
        const allProducts = await fetchProducts(50);
        console.log(`📦 Retrieved ${allProducts.length} total products`);

        // Filter by "homepage" tag
        const taggedProducts = allProducts.filter(product => {
          const hasTag = product.node.tags && product.node.tags.includes('homepage');
          if (hasTag) {
            console.log(`✅ Product "${product.node.title}" has "homepage" tag`);
          }
          return hasTag;
        });

        console.log(`🏷️ Found ${taggedProducts.length} products with "homepage" tag`);

        // Take first 6 tagged products
        let flockProducts = taggedProducts.slice(0, 6);

        // Fallback: if no tagged products, show first 6 products
        if (flockProducts.length === 0) {
          console.log('⚠️ No products with "homepage" tag found, showing first 6 products');
          flockProducts = allProducts.slice(0, 6);
        }

        setProducts(flockProducts);
      } catch (error) {
        console.error('❌ Error fetching products:', error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const firstVariant = product.node.variants.edges[0].node;
    
    const cartItem: CartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF6B9D", "#FFD93D", "#6BCB77", "#00D9FF"],
    });

    toast.success("Added to cart!", {
      description: `${product.node.title} added to your cart!`,
    });

    setIsCartOpen(true);
  };

  if (isLoading) {
    return (
      <section className="py-24 px-4 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-9xl font-black text-center mb-20 text-foreground"
          >
            THE FLOCK
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No products available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product, i) => (
              <motion.div
                key={product.node.id}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-6 pb-12 shadow-2xl ${borderColors[i % borderColors.length]} border-8 cursor-pointer rounded-2xl`}
                style={{
                  boxShadow: "8px 8px 0px rgba(0,0,0,0.2)",
                }}
                onClick={() => navigate(`/product/${product.node.handle}`)}
              >
                <div className="bg-muted aspect-square flex items-center justify-center mb-6 overflow-hidden relative">
                  {product.node.images.edges[0]?.node ? (
                    <img
                      src={product.node.images.edges[0].node.url}
                      alt={product.node.images.edges[0].node.altText || product.node.title}
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-6xl">📦</span>
                  )}
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4 text-center">
                  {product.node.title}
                </h3>
                <p className="text-center text-sm text-muted-foreground mb-4 px-2 line-clamp-2">
                  {product.node.description || "A delicious Rubber Ducky beverage!"}
                </p>

                <p className="text-lg font-semibold text-primary text-center mb-4">
                  {product.node.priceRange.minVariantPrice.currencyCode} {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>

                {product.node.variants.edges[0]?.node.availableForSale ? (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="w-full bg-foreground text-background hover:bg-foreground/90 font-black text-lg"
                  >
                    GRAB NOW 🦆
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full bg-gray-400 text-white font-black text-lg cursor-not-allowed opacity-60"
                  >
                    SOLD OUT 😢
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};