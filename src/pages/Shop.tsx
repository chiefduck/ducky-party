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
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(20);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);

        // Extract unique categories from BOTH product types AND tags
        const uniqueCategories = new Set<string>();
        fetchedProducts.forEach(product => {
          // Add product type
          if (product.node.productType) {
            uniqueCategories.add(product.node.productType);
          }
          // Add all tags
          if (product.node.tags && product.node.tags.length > 0) {
            product.node.tags.forEach(tag => {
              // Only add meaningful tags (skip internal ones like 'homepage')
              if (tag && !tag.toLowerCase().includes('homepage')) {
                uniqueCategories.add(tag);
              }
            });
          }
        });

        setCategories(["All", ...Array.from(uniqueCategories).sort()]);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      // Filter by BOTH productType AND tags
      setFilteredProducts(
        products.filter(product => {
          // Check if category matches productType
          const matchesType = product.node.productType === selectedCategory;

          // Check if category matches any tag (case-insensitive)
          const matchesTag = product.node.tags && product.node.tags.some(tag =>
            tag.toLowerCase() === selectedCategory.toLowerCase()
          );

          return matchesType || matchesTag;
        })
      );
    }
  }, [selectedCategory, products]);

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
    toast.success("Added to cart!", {
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

      {/* Category Filters */}
      {!isLoading && categories.length > 1 && (
        <section className="py-8 bg-background border-b-4 border-foreground">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-6 py-3 rounded-full font-black text-base md:text-lg
                    border-4 border-foreground transition-all shadow-lg
                    ${
                      selectedCategory === category
                        ? 'bg-primary text-white scale-105'
                        : 'bg-background text-foreground hover:bg-secondary'
                    }
                  `}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                {selectedCategory !== "All" && (
                  <span> in <span className="font-bold text-primary">{selectedCategory}</span></span>
                )}
              </p>
            </div>
          </div>
        </section>
      )}

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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">No Products Found</h2>
              <p className="text-xl text-muted-foreground mb-8">
                {products.length === 0
                  ? "We haven't added any products yet. Check back soon!"
                  : `No products found in the ${selectedCategory} category.`
                }
              </p>
              {products.length === 0 && (
                <div className="max-w-2xl mx-auto p-6 bg-muted rounded-xl border-2 border-border">
                  <p className="text-lg mb-4">
                    💡 <strong>Want to add products?</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Just tell me what product you'd like to create! For example: "Create a product called 'Lime Margarita' for $4.99"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
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
                        <div className="w-full h-full flex items-center justify-center text-6xl text-muted-foreground">
                          No Image
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
