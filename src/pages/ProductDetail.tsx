import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
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

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-foreground shadow-2xl">
                {product.node.images.edges[0]?.node ? (
                  <img
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.images.edges[0].node.altText || product.node.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl">
                    🦆
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-black text-foreground">
                {product.node.title}
              </h1>
              
              <div className="text-3xl font-bold text-primary">
                {selectedVariant.price.currencyCode}{' '}
                {parseFloat(selectedVariant.price.amount).toFixed(2)}
              </div>

              <p className="text-lg text-muted-foreground">
                {product.node.description || "A refreshing non-alcoholic beverage from Rubber Ducky Drink Co!"}
              </p>

              {/* Variant Selection */}
              {product.node.variants.edges.length > 1 && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Select Variant</Label>
                  <div className="flex flex-wrap gap-2">
                    {product.node.variants.edges.map((variant, index) => (
                      <Button
                        key={variant.node.id}
                        variant={selectedVariantIndex === index ? "default" : "outline"}
                        onClick={() => setSelectedVariantIndex(index)}
                        disabled={!variant.node.availableForSale}
                      >
                        {variant.node.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full gap-2"
                size="lg"
                disabled={!selectedVariant.availableForSale}
              >
                <ShoppingCart className="w-5 h-5" />
                {selectedVariant.availableForSale ? "Add to Cart" : "Out of Stock"}
              </Button>

              {!selectedVariant.availableForSale && (
                <p className="text-sm text-muted-foreground text-center">
                  This variant is currently unavailable
                </p>
              )}
            </motion.div>
          </div>
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
