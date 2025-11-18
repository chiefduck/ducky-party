import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { submitToMake } from "@/lib/formSubmit";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WaitlistModal = ({ open, onOpenChange }: WaitlistModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    zipCode: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.zipCode && !/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Zip code must be 5 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - silently reject bots
    if (honeypot) {
      return;
    }

    // Validation
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const result = await submitToMake('waitlist', {
        name: formData.name,
        email: formData.email,
        zipCode: formData.zipCode || '',
        timestamp: new Date().toISOString()
      });

      if (result.success) {
        setSubmitted(true);
        toast.success("You're on the list!");

        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', zipCode: '' });
          setSubmitted(false);
          onOpenChange(false);
        }, 3000);
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <div className="p-6 md:p-8 bg-white rounded-2xl">
          {submitted ? (
            <div className="bg-green-50 border-4 border-green-400 rounded-2xl p-6 text-center">
              <p className="text-4xl mb-3">🎉</p>
              <p className="font-bold text-green-800 text-lg mb-2">
                You're on the list!
              </p>
              <p className="text-green-700">
                We'll let you know when we launch in your area! 🦆✨
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-black text-center mb-6">
                Join the Waitlist 🦆
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot Field */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute left-[-9999px]"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Name */}
                <div>
                  <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                               focus:border-primary focus:outline-none focus:ring-2
                               focus:ring-primary/20 text-base transition-all"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                               focus:border-primary focus:outline-none focus:ring-2
                               focus:ring-primary/20 text-base transition-all"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
                    Zip Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="12345"
                    maxLength={5}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                               focus:border-primary focus:outline-none focus:ring-2
                               focus:ring-primary/20 text-base transition-all"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-bold py-4 px-6
                             rounded-xl border-4 border-primary hover:scale-105
                             transition-transform text-lg disabled:opacity-50
                             disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending... 🦆
                    </span>
                  ) : (
                    'Get Quacked In! 🦆'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
