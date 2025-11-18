import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { submitToMake } from "@/lib/formSubmit";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RecipeSubmitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RecipeSubmitModal = ({ open, onOpenChange }: RecipeSubmitModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    recipeTitle: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: ''
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

    if (!formData.recipeTitle || formData.recipeTitle.trim().length < 5) {
      newErrors.recipeTitle = 'Recipe title must be at least 5 characters';
    }

    if (!formData.ingredients || formData.ingredients.trim().length < 20) {
      newErrors.ingredients = 'Ingredients must be at least 20 characters';
    }

    if (!formData.instructions || formData.instructions.trim().length < 50) {
      newErrors.instructions = 'Instructions must be at least 50 characters';
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
      const result = await submitToMake('recipe-submit', {
        name: formData.name,
        email: formData.email,
        recipeTitle: formData.recipeTitle,
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        prepTime: formData.prepTime || '',
        cookTime: formData.cookTime || '',
        servings: formData.servings || '',
        timestamp: new Date().toISOString()
      });

      if (result.success) {
        setSubmitted(true);
        toast.success("Recipe submitted!");

        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            recipeTitle: '',
            ingredients: '',
            instructions: '',
            prepTime: '',
            cookTime: '',
            servings: ''
          });
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8 bg-white rounded-2xl">
          {submitted ? (
            <div className="bg-green-50 border-4 border-green-400 rounded-2xl p-6 text-center">
              <p className="text-4xl mb-3">🎉</p>
              <p className="font-bold text-green-800 text-lg mb-2">
                Recipe submitted!
              </p>
              <p className="text-green-700">
                We'll review it and may feature it on our site! 🍹✨
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-black text-center mb-6">
                Share Your Recipe 🦆
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

                {/* Recipe Title */}
                <div>
                  <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
                    Recipe Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.recipeTitle}
                    onChange={(e) => setFormData({ ...formData, recipeTitle: e.target.value })}
                    placeholder="Tropical Ducky Delight"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                               focus:border-primary focus:outline-none focus:ring-2
                               focus:ring-primary/20 text-base transition-all"
                  />
                  {errors.recipeTitle && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipeTitle}</p>
                  )}
                </div>

                {/* Ingredients */}
                <div>
                  <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
                    Ingredients <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    placeholder="List ingredients, one per line"
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                               focus:border-primary focus:outline-none focus:ring-2
                               focus:ring-primary/20 text-base resize-none"
                  />
                  {errors.ingredients && (
                    <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
                  )}
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
                    Instructions <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    placeholder="Step-by-step instructions"
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                               focus:border-primary focus:outline-none focus:ring-2
                               focus:ring-primary/20 text-base resize-none"
                  />
                  {errors.instructions && (
                    <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
                  )}
                </div>

                {/* Optional Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Prep Time */}
                  <div>
                    <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
                      Prep Time
                    </label>
                    <input
                      type="text"
                      value={formData.prepTime}
                      onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                      placeholder="5 minutes"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                                 focus:border-primary focus:outline-none focus:ring-2
                                 focus:ring-primary/20 text-base transition-all"
                    />
                  </div>

                  {/* Cook Time */}
                  <div>
                    <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
                      Cook Time
                    </label>
                    <input
                      type="text"
                      value={formData.cookTime}
                      onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
                      placeholder="0 minutes"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                                 focus:border-primary focus:outline-none focus:ring-2
                                 focus:ring-primary/20 text-base transition-all"
                    />
                  </div>

                  {/* Servings */}
                  <div>
                    <label className="block text-base md:text-lg font-bold text-gray-800 mb-2">
                      Servings
                    </label>
                    <input
                      type="number"
                      value={formData.servings}
                      onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                      placeholder="2"
                      min="1"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                                 focus:border-primary focus:outline-none focus:ring-2
                                 focus:ring-primary/20 text-base transition-all"
                    />
                  </div>
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
                    'Share My Recipe! 🦆'
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
