import { useState } from "react";
import { submitToMake } from "@/lib/formSubmit";
import { StarRating } from "@/components/StarRating";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface WriteReviewFormProps {
  productId: string;
  productName: string;
}

export const WriteReviewForm = ({ productId, productName }: WriteReviewFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    text: ''
  });
  const [rating, setRating] = useState(0);
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

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.text || formData.text.trim().length < 10) {
      newErrors.text = 'Review must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - silently reject bots
    if (honeypot) {
      console.log('Spam detected - submission blocked');
      return;
    }

    // Validation
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const result = await submitToMake('review', {
        productId,
        productName,
        reviewerName: formData.name,
        reviewerEmail: formData.email,
        rating,
        reviewTitle: formData.title || '',
        reviewText: formData.text,
        timestamp: new Date().toISOString()
      });

      if (result.success) {
        setSubmitted(true);
        toast.success("Review submitted!");

        // Reset form after 5 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', title: '', text: '' });
          setRating(0);
          setSubmitted(false);
        }, 5000);
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

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 md:p-8 bg-green-50 border-4 border-green-400 rounded-2xl text-center">
        <p className="text-4xl mb-3">🎉</p>
        <p className="font-bold text-green-800 text-lg mb-2">
          Thanks for the review!
        </p>
        <p className="text-green-700">
          We'll read it and it may appear on our site soon! 🦆
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-2xl border-4 border-primary shadow-lg">
      <h2 className="text-2xl md:text-3xl font-black text-center mb-6">
        Write a Review ⭐
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

        {/* Rating */}
        <div>
          <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
            Rating <span className="text-red-500">*</span>
          </label>
          <StarRating rating={rating} setRating={setRating} />
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
            Your Name <span className="text-red-500">*</span>
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

        {/* Review Title */}
        <div>
          <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
            Review Title (Optional)
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Sum up your review"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                       focus:border-primary focus:outline-none focus:ring-2
                       focus:ring-primary/20 text-base transition-all"
          />
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            placeholder="Tell us what you think!"
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                       focus:border-primary focus:outline-none focus:ring-2
                       focus:ring-primary/20 text-base resize-none"
          />
          {errors.text && (
            <p className="text-red-500 text-sm mt-1">{errors.text}</p>
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
            'Submit Quacking Review! ⭐'
          )}
        </button>
      </form>
    </div>
  );
};
