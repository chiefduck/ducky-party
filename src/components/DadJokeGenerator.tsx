import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const JOKES = [
  // Rubber Ducky Jokes
  "Why did the rubber ducky cross the road? To get to the other tide! 🌊",
  "What do you call a rubber duck that's a detective? Sherlock Foams! 🔍",
  "Why don't rubber duckies ever get lost? They always go with the flow! 🦆",
  "What's a rubber ducky's favorite type of music? Beak-boxing! 🎤",
  "Why did the rubber ducky get a job at the bank? To help with liquid assets! 💰",
  "What do you call a rubber ducky that tells jokes? A quack-up! 😂",
  "Why don't rubber duckies ever argue? They prefer to let things float by! ☮️",
  "What's a rubber ducky's favorite exercise? Water aerobics! 💪",
  "Why was the rubber ducky such a good therapist? It really knew how to help people stay afloat! 🛟",
  "What do you call a rubber ducky with a college degree? A scholar-duck! 🎓",
  "Why did the rubber ducky go to therapy? It had too many emotional float-ations! 💭",
  "What's a rubber ducky's favorite dance? The float and shuffle! 💃",
  "Why did the rubber ducky start a band? It wanted to make some splash hits! 🎵",
  "What do you call a rubber ducky that's always late? Tardy-duck! ⏰",
  "Why don't rubber duckies play poker? They always show their bills! 🃏",

  // Margarita/Drink Jokes
  "Why did the margarita go to school? To become a little brrr-ighter! 🧊",
  "What's a margarita's favorite subject? Tequil-ography! 🗺️",
  "Why don't margaritas ever get invited to parties? They're too salty! 🧂",
  "What do you call a frozen margarita on a hot day? A cool opportunity! 😎",
  "Why did the lime go to the doctor? It wasn't peeling well! 🍋‍🟩",
  "What's a margarita's favorite movie? Tequila Mockingbird! 🎬",

  // General Dad Jokes
  "Why don't scientists trust atoms? Because they make up everything! ⚛️",
  "What do you call a bear with no teeth? A gummy bear! 🐻",
  "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
  "What do you call a fake noodle? An impasta! 🍝",
  "Why don't eggs tell jokes? They'd crack each other up! 🥚",
  "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks! 🦖",
  "Why did the bicycle fall over? It was two tired! 🚲",
  "What did the ocean say to the beach? Nothing, it just waved! 👋",
];

export function DadJokeGenerator() {
  const [currentJoke, setCurrentJoke] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [usedJokes, setUsedJokes] = useState<Set<number>>(new Set());

  const getRandomJoke = () => {
    setIsAnimating(true);

    // If we've used all jokes, reset
    if (usedJokes.size === JOKES.length) {
      setUsedJokes(new Set());
    }

    // Get a random joke we haven't shown yet
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * JOKES.length);
    } while (usedJokes.has(randomIndex) && usedJokes.size < JOKES.length);

    setUsedJokes(prev => new Set(prev).add(randomIndex));

    // Small delay for animation
    setTimeout(() => {
      setCurrentJoke(JOKES[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-4 border-primary p-8 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            🎭 Need a Laugh?
          </h2>
          <p className="text-lg text-gray-700">
            Click the button for a dad joke that'll make you quack up!
          </p>
        </div>

        <div className="mb-6">
          <Button
            onClick={getRandomJoke}
            disabled={isAnimating}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold
                     py-6 px-8 rounded-xl border-4 border-primary
                     hover:scale-105 transition-all text-xl
                     disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:scale-100"
          >
            {isAnimating ? "🦆 Thinking..." : "Tell Me a Joke! 🎭"}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {currentJoke && (
            <motion.div
              key={currentJoke}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl border-4 border-cyan-400 p-6 shadow-md"
            >
              <p className="text-xl md:text-2xl font-bold text-center text-gray-800 leading-relaxed">
                {currentJoke}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!currentJoke && (
          <div className="bg-white rounded-xl border-4 border-gray-300 p-6 text-center">
            <p className="text-gray-400 text-lg font-bold">
              Click the button above for a groaner! 🦆
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
