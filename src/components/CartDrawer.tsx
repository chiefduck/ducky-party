import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  const { items, removeItem, updateQuantity, totalItems, subtotal, isOpen, closeCart } = useCart();
  const navigate = useNavigate();

  const handleKeepShopping = () => {
    closeCart();
    navigate("/");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-background border-l-4 border-foreground z-50 flex flex-col shadow-2xl"
            style={{
              background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)",
            }}
          >
            {/* Header */}
            <div className="p-6 border-b-4 border-foreground bg-background/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-4xl font-black text-foreground">YOUR FLOCK 🦆</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCart}
                  className="hover:bg-muted"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <p className="text-lg font-bold text-muted-foreground">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-9xl mb-4 bounce-float">🦆</div>
                  <h3 className="text-3xl font-black text-foreground mb-2">
                    Your flock is empty!
                  </h3>
                  <p className="text-xl font-bold text-muted-foreground mb-6">
                    Let's fix that!
                  </p>
                  <Button
                    onClick={handleKeepShopping}
                    size="lg"
                    className="font-black text-xl px-8 py-6 rounded-full border-4 border-foreground"
                  >
                    START SHOPPING 🛒
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-card p-4 border-4 border-foreground rounded-xl shadow-lg relative"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0 bg-muted rounded-lg overflow-hidden border-2 border-foreground">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h4 className="text-lg font-black text-foreground mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm font-bold text-muted-foreground mb-2">
                          {item.packSize}
                        </p>
                        <p className="text-xl font-black text-primary">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border-2 border-foreground hover:bg-secondary"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-xl font-black text-foreground w-12 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border-2 border-foreground hover:bg-secondary"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <div className="ml-auto text-xl font-black text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t-4 border-foreground bg-background/80 backdrop-blur-sm space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-black text-foreground">Subtotal:</span>
                  <span className="text-3xl font-black text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Free Shipping Message */}
                {subtotal < 50 && (
                  <div className="text-center p-3 bg-accent/20 rounded-lg border-2 border-accent">
                    <p className="text-sm font-bold text-foreground">
                      Add ${(50 - subtotal).toFixed(2)} more for FREE SHIPPING! 🚚
                    </p>
                  </div>
                )}
                {subtotal >= 50 && (
                  <div className="text-center p-3 bg-secondary/20 rounded-lg border-2 border-secondary">
                    <p className="text-sm font-bold text-foreground">
                      ✨ FREE SHIPPING UNLOCKED! ✨
                    </p>
                  </div>
                )}

                {/* Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleKeepShopping}
                    variant="outline"
                    className="w-full font-black text-lg py-6 rounded-full border-4 border-foreground"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    KEEP SHOPPING
                  </Button>
                  <Button
                    className="w-full font-black text-xl py-6 rounded-full border-4 border-foreground hover:scale-105 transition-transform"
                  >
                    CHECKOUT 🛒
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
