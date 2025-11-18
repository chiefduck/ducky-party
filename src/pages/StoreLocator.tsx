import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Search, MapPin, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SuggestLocationModal } from "@/components/SuggestLocationModal";
import GoogleMap from "@/components/GoogleMap";

type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  hours?: string;
  type?: string;
  latitude: number | null;
  longitude: number | null;
};

// Keep Loveable's styling constants
const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
const borderColors = ["border-primary", "border-secondary", "border-accent", "border-[hsl(var(--sunshine))]"];

const StoreLocator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

  // Fetch real data from Google Sheets
  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQrr85UW34Ge71wwYvg_tYIYmtVoELDjzg7JnH0-Dc0if27qLB2m2JE2xXGtlHq3T9H35XBinXvPmIg/pub?gid=0&single=true&output=csv"
    )
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true });
        const mapped: Location[] = parsed.data.map((row: any, index: number) => {
          const lat = parseFloat(String(row.Latitude || "").trim());
          const lng = parseFloat(String(row.Longitude || "").trim());
          return {
            id: `${index}`,
            name: row["Store Name"]?.trim() || "Unknown",
            address: row.Address?.trim() || "",
            city: row.City?.trim() || "",
            state: row.State?.trim() || "",
            zipCode: String(row.Zip || ""),
            phone: row.Phone?.trim() || "",
            hours: row.Hours?.trim() || "",
            type: row.Type?.trim() || "",
            latitude: !isNaN(lat) ? lat : null,
            longitude: !isNaN(lng) ? lng : null,
          };
        });
        setLocations(mapped);
      })
      .catch((err) => console.error("CSV Fetch error:", err));
  }, []);

  const filteredLocations = locations.filter((location) => {
    const matchesSearch =
      location.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.zipCode?.includes(searchTerm);

    return (
      matchesSearch &&
      location.latitude !== null &&
      location.longitude !== null &&
      !isNaN(location.latitude) &&
      !isNaN(location.longitude)
    );
  });

  const handleFindLocationClick = (location: Location) => {
    if (window.fbq && typeof window.fbq === "function") {
      window.fbq("track", "FindLocation", {
        store_name: location.name,
        city: location.city,
        state: location.state,
        store_address: location.address,
        zip_code: location.zipCode,
        event_source: "Store Locator Page",
      });
    }
  };

  const getDirections = (location: Location) => {
    const address = `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      "_blank"
    );
    handleFindLocationClick(location);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Keep Loveable's style */}
      <section className="rainbow-gradient py-20 px-5 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4">
            FIND OUR DRINKS 🦆
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            Quack into stores near you!
          </p>
        </div>
      </section>

      {/* Search Section - Keep Loveable's style */}
      <section className="container mx-auto px-5 -mt-10 relative z-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter City, State or Zip Code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-16 pl-16 pr-6 text-lg rounded-full border-4 border-foreground bg-card shadow-lg font-bold"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-5 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Store List */}
          <div className="relative">
            {/* Scroll hint for mobile */}
            {filteredLocations.length > 2 && (
              <div className="mb-3 text-center lg:hidden">
                <p className="text-sm font-bold text-muted-foreground animate-bounce">
                  ↓ Scroll for more locations ↓
                </p>
              </div>
            )}

            {/* Top gradient fade */}
            {filteredLocations.length > 0 && (
              <div className="absolute top-0 left-0 right-4 h-8 bg-gradient-to-b from-background to-transparent pointer-events-none z-10 rounded-t-2xl" />
            )}

            {/* Scrollable store list */}
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-background">
            {filteredLocations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl font-bold text-muted-foreground">
                  No stores found 😢
                </p>
                <p className="text-lg text-muted-foreground mt-2">
                  Try a different search!
                </p>
              </div>
            ) : (
              filteredLocations.map((location, index) => (
                <div
                  key={location.id}
                  className={`bg-card p-6 border-4 ${borderColors[index % borderColors.length]} ${
                    rotations[index % rotations.length]
                  } hover:rotate-0 hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-black text-foreground">{location.name}</h3>
                    {location.type && (
                      <Badge variant="secondary" className="font-bold border-2 border-foreground">
                        {location.type}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-foreground font-semibold">
                        {location.address}
                        <br />
                        {location.city}, {location.state} {location.zipCode}
                      </p>
                    </div>
                    {location.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-secondary" />
                        <p className="text-foreground font-semibold">{location.phone}</p>
                      </div>
                    )}
                    {location.hours && (
                      <p className="text-sm text-muted-foreground mt-1">{location.hours}</p>
                    )}
                  </div>
                  <Button
                    onClick={() => getDirections(location)}
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

            {/* Bottom gradient fade */}
            {filteredLocations.length > 0 && (
              <div className="absolute bottom-0 left-0 right-4 h-16 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none rounded-b-2xl" />
            )}
          </div>

          {/* Right Column - REAL Google Map */}
          <div className="lg:sticky lg:top-24 h-[600px]">
            <div className="h-full rounded-2xl border-4 border-foreground overflow-hidden shadow-lg">
              <GoogleMap locations={filteredLocations} />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA - Keep Loveable's style */}
      <section className="container mx-auto px-5 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-2xl font-bold text-foreground">
            Don't see your city? 🤔
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-4 border-foreground font-black text-xl px-8 py-6 hover:bg-secondary hover:scale-110 transition-transform"
            onClick={() => setIsSuggestModalOpen(true)}
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
              onClick={() => window.location.href = '/shop'}
            >
              SHOP NOW 🛒
            </Button>
          </div>
        </div>
      </section>

      <SuggestLocationModal
        open={isSuggestModalOpen}
        onOpenChange={setIsSuggestModalOpen}
      />

      <Footer />
    </div>
  );
};

export default StoreLocator;
