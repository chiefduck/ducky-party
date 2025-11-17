import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const contactInfoBoxes = [
  {
    icon: "📧",
    title: "General Inquiries",
    text: "For all other questions, email us at hello@rubberduckydrinkco.com",
    color: "border-primary",
    rotation: "rotate-[-2deg]",
  },
  {
    icon: "🏪",
    title: "Wholesale / Retail",
    text: "Want to stock Rubber Ducky? We'd love to chat!",
    color: "border-secondary",
    rotation: "rotate-[2deg]",
  },
  {
    icon: "🎉",
    title: "Event Requests",
    text: "Want Ducky at your event or festival? Quack at us!",
    color: "border-accent",
    rotation: "rotate-[-1deg]",
  },
  {
    icon: "📰",
    title: "Press & Media",
    text: "Media inquiries? We're happy to share our story!",
    color: "border-sunshine",
    rotation: "rotate-[1deg]",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.inquiryType) {
      newErrors.inquiryType = "Please select an inquiry type";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: Replace with your Make.com webhook URL
      // const webhookUrl = "YOUR_MAKE_COM_WEBHOOK_URL";
      // 
      // try {
      //   await fetch(webhookUrl, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(formData),
      //   });
      // } catch (error) {
      //   console.error("Error sending to webhook:", error);
      // }
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out! We'll get back to you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
      });
      setErrors({});
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newsletterEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      // TODO: Replace with your Make.com webhook URL
      // const webhookUrl = "YOUR_MAKE_COM_WEBHOOK_URL";
      // 
      // try {
      //   await fetch(webhookUrl, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email: newsletterEmail }),
      //   });
      // } catch (error) {
      //   console.error("Error sending to webhook:", error);
      // }
      
      toast({
        title: "Welcome to the flock!",
        description: "You're subscribed to our newsletter!",
      });
      setNewsletterEmail("");
    } else {
      toast({
        title: "Oops!",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-7xl md:text-8xl font-black mb-6 text-background drop-shadow-lg">
            LET'S CHAT!
          </h1>
          <p className="text-2xl md:text-3xl text-background/90 font-bold max-w-3xl mx-auto">
            Questions? Ideas? Just wanna say hi? We're all ears (and beaks)!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              <h2 className="text-4xl font-black mb-8 text-foreground">
                GET IN TOUCH 💌
              </h2>
              
              {contactInfoBoxes.map((box, index) => (
                <div
                  key={index}
                  className={`bg-card p-6 rounded-2xl border-4 ${box.color} ${box.rotation} hover:rotate-0 hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  <div className="text-5xl mb-3">{box.icon}</div>
                  <h3 className="text-2xl font-black mb-2 text-foreground">
                    {box.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {box.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-card rounded-2xl border-4 border-foreground shadow-2xl p-8">
              <h2 className="text-4xl font-black mb-6 text-foreground">
                SEND US A MESSAGE 📬
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-foreground font-bold">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="border-2 mt-1"
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-foreground font-bold">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="border-2 mt-1"
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-bold">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-2 mt-1"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground font-bold">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="border-2 mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="inquiryType" className="text-foreground font-bold">
                    Inquiry Type *
                  </Label>
                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) => handleInputChange("inquiryType", value)}
                  >
                    <SelectTrigger className="border-2 mt-1">
                      <SelectValue placeholder="Select an inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="press">Press</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.inquiryType && (
                    <p className="text-destructive text-sm mt-1">{errors.inquiryType}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground font-bold">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="border-2 mt-1 min-h-[150px]"
                    placeholder="Tell us what's on your mind..."
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-xl font-black"
                >
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-2xl border-4 border-foreground shadow-2xl p-12 rotate-[-1deg] hover:rotate-0 transition-all duration-300">
              <h2 className="text-5xl font-black mb-4 text-foreground">
                JOIN THE FLOCK
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get exclusive updates, special offers, and duck puns delivered straight to your inbox!
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="border-2 flex-1 text-lg"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="text-xl font-black whitespace-nowrap"
                >
                  SUBSCRIBE 🎉
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
