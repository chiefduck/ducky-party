import { useState } from "react";
import { Search, MapPin, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  type: string;
}

const stores: Store[] = [
  {
    id: 1,
    name: "Whole Foods Market",
    address: "1234 Market St",
    city: "Denver",
    state: "CO",
    zip: "80202",
    phone: "(303) 555-0101",
    type: "Grocery",
  },
  {
    id: 2,
    name: "Total Wine & More",
    address: "5678 Cherry Creek Dr",
    city: "Denver",
    state: "CO",
    zip: "80246",
    phone: "(303) 555-0202",
    type: "Liquor Store",
  },
  {
    id: 3,
    name: "Sprouts Farmers Market",
    address: "9012 Broadway",
    city: "Boulder",
    state: "CO",
    zip: "80302",
    phone: "(303) 555-0303",
    type: "Grocery",
  },
  {
    id: 4,
    name: "King Soopers",
    address: "3456 Arapahoe Ave",
    city: "Boulder",
    state: "CO",
    zip: "80303",
    phone: "(303) 555-0404",
    type: "Grocery",
  },
  {
    id: 5,
    name: "Target",
    address: "7890 Colorado Blvd",
    city: "Denver",
    state: "CO",
    zip: "80220",
    phone: "(303) 555-0505",
    type: "Retail",
  },
  {
    id: 6,
    name: "Trader Joe's",
    address: "2468 Pearl St",
    city: "Boulder",
    state: "CO",
    zip: "80302",
    phone: "(303) 555-0606",
    type: "Grocery",
  },
  {
    id: 7,
    name: "Safeway",
    address: "1357 Main St",
    city: "Fort Collins",
    state: "CO",
    zip: "80521",
    phone: "(970) 555-0707",
    type: "Grocery",
  },
  {
    id: 8,
    name: "Natural Grocers",
    address: "8642 College Ave",
    city: "Fort Collins",
    state: "CO",
    zip: "80524",
    phone: "(970) 555-0808",
    type: "Grocery",
  },
];

const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
const borderColors = ["border-primary", "border-secondary", "border-accent", "border-[hsl(var(--sunshine))]"];

const StoreLocator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStores, setFilteredStores] = useState(stores);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredStores(stores);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = stores.filter(
      (store) =>
        store.city.toLowerCase().includes(query) ||
        store.state.toLowerCase().includes(query) ||
        store.zip.includes(query) ||
        store.name.toLowerCase().includes(query)
    );
    setFilteredStores(filtered);
  };

  const getDirections = (store: Store) => {
    const address = `${store.address}, ${store.city}, ${store.state} ${store.zip}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="rainbow-gradient py-20 px-5 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🦆</div>
          <div className="absolute top-20 right-20 text-5xl bounce-float">🦆</div>
          <div className="absolute bottom-10 left-1/4 text-4xl tilt">🦆</div>
          <div className="absolute bottom-20 right-1/3 text-5xl spin-slow">🦆</div>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4">
            FIND OUR DRINKS 🦆
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            Quack into stores near you!
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-5 -mt-10 relative z-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter City, State or Zip Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="h-16 pl-16 pr-6 text-lg rounded-full border-4 border-foreground bg-card shadow-lg font-bold"
              />
            </div>
            <Button
              onClick={handleSearch}
              size="lg"
              className="h-16 px-8 rounded-full border-4 border-foreground font-black text-lg shadow-lg"
            >
              SEARCH 🔍
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-5 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Store List */}
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
            {filteredStores.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl font-bold text-muted-foreground">
                  No stores found 😢
                </p>
                <p className="text-lg text-muted-foreground mt-2">
                  Try a different search!
                </p>
              </div>
            ) : (
              filteredStores.map((store, index) => (
                <div
                  key={store.id}
                  className={`bg-card p-6 border-4 ${borderColors[index % borderColors.length]} ${
                    rotations[index % rotations.length]
                  } hover:rotate-0 hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-black text-foreground">{store.name}</h3>
                    <Badge variant="secondary" className="font-bold border-2 border-foreground">
                      {store.type}
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-foreground font-semibold">
                        {store.address}
                        <br />
                        {store.city}, {store.state} {store.zip}
                      </p>
                    </div>
                    {store.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-secondary" />
                        <p className="text-foreground font-semibold">{store.phone}</p>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => getDirections(store)}
                    variant="outline"
                    className="w-full border-2 border-foreground font-black hover:bg-primary hover:text-primary-foreground"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    GET DIRECTIONS 🗺️
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Right Column - Map Placeholder */}
          <div className="lg:sticky lg:top-24 h-[600px]">
            <div className="h-full rounded-2xl border-4 border-foreground bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center shadow-lg">
              <div className="text-center p-8">
                <div className="text-8xl mb-4">🗺️</div>
                <p className="text-3xl font-black text-foreground">
                  Map Integration
                </p>
                <p className="text-xl font-bold text-muted-foreground mt-2">
                  Coming Soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-5 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-2xl font-bold text-foreground">
            Don't see your city? 🤔
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-4 border-foreground font-black text-xl px-8 py-6 hover:bg-secondary hover:scale-110 transition-transform"
          >
            SUGGEST A LOCATION 🦆
          </Button>
          <div className="pt-8">
            <p className="text-xl font-bold text-muted-foreground mb-4">
              Or shop online!
            </p>
            <Button
              size="lg"
              className="border-4 border-foreground font-black text-xl px-8 py-6 hover:scale-110 transition-transform"
            >
              SHOP NOW 🛒
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StoreLocator;
