import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(20);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
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
    toast.success("Added to cart! 🦆", {
      description: `${product.node.title} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden rainbow-gradient">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-black text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            SHOP RUBBER DUCKY 🦆
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The best non-alcoholic margaritas, ready to quack you up!
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">No Products Found 🦆</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We haven't added any products yet. Check back soon!
              </p>
              <div className="max-w-2xl mx-auto p-6 bg-muted rounded-xl border-2 border-border">
                <p className="text-lg mb-4">
                  💡 <strong>Want to add products?</strong>
                </p>
                <p className="text-muted-foreground">
                  Just tell me what product you'd like to create! For example: "Create a product called 'Lime Margarita' for $4.99"
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.node.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                    <div 
                      onClick={() => navigate(`/product/${product.node.handle}`)}
                      className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 aspect-square"
                    >
                      {product.node.images.edges[0]?.node ? (
                        <img
                          src={product.node.images.edges[0].node.url}
                          alt={product.node.images.edges[0].node.altText || product.node.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-8xl">
                          🦆
                        </div>
                      )}
                    </div>
                    
                    <CardHeader onClick={() => navigate(`/product/${product.node.handle}`)}>
                      <CardTitle className="line-clamp-1">
                        {product.node.title}
                      </CardTitle>
                      <CardDescription className="text-xl font-bold text-primary">
                        {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                        {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent onClick={() => navigate(`/product/${product.node.handle}`)}>
                      <p className="text-muted-foreground line-clamp-2">
                        {product.node.description || "A delicious Rubber Ducky beverage!"}
                      </p>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className="w-full gap-2" 
                        size="lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
