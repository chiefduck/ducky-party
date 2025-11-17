import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import logo from "@/assets/logo.svg";

const menuItems = [
  { label: "Shop", path: "/shop" },
  { label: "Store Locator", path: "/store-locator" },
  { label: "Recipes", path: "/recipes" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-20 border-b-4 border-foreground bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-full items-center justify-between px-5">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <img src={logo} alt="Rubber Ducky Drink Co." className="h-12 w-auto transition-transform hover:scale-110" />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="text-foreground text-lg font-bold transition-all hover:scale-110 hover:text-primary"
              activeClassName="text-primary underline decoration-4 underline-offset-4"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Cart Button - Always visible */}
          <CartDrawer />

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="border-2 border-foreground"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-md border-4 border-foreground bg-background"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <img src={logo} alt="Rubber Ducky Drink Co." className="h-10 w-auto" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-6">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground text-2xl font-bold transition-all hover:text-primary hover:scale-105"
                    activeClassName="text-primary underline decoration-4 underline-offset-8"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
