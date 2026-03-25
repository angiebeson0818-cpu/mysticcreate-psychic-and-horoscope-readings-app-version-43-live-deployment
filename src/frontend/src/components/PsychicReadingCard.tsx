import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface PsychicReadingCardProps {
  onOpen: () => void;
  isBlueTheme?: boolean;
}

export default function PsychicReadingCard({
  onOpen,
  isBlueTheme = false,
}: PsychicReadingCardProps) {
  return (
    <div
      className={`floating-card group relative overflow-hidden rounded-3xl p-8 backdrop-blur-md border-2 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl ${
        isBlueTheme
          ? "bg-gradient-to-br from-blue-600/30 to-indigo-900/50 border-blue-400/40 hover:border-blue-400/70 hover:shadow-blue-400/20"
          : "bg-gradient-to-br from-sage/30 to-background/50 border-gold/40 hover:border-gold/70 hover:shadow-gold/20"
      }`}
    >
      {/* Tribal Sun Image */}
      <div className="flex justify-center mb-6">
        <img
          src="/assets/generated/tribal-sun-transparent.dim_200x200.png"
          alt="Tribal Sun"
          className="w-32 h-32 object-contain floating-element"
        />
      </div>

      <h2
        className={`text-3xl font-bold mb-3 text-center transition-colors duration-500 ease-in-out ${
          isBlueTheme ? "text-blue-300" : "text-gold"
        }`}
      >
        Psychic Reading
      </h2>
      <p
        className={`text-center mb-6 transition-colors duration-500 ease-in-out ${
          isBlueTheme ? "text-blue-200/90" : "text-cream/90"
        }`}
      >
        Intuitive insights from the cosmic realm
      </p>

      <Button
        onClick={onOpen}
        className={`w-full font-bold py-6 text-lg rounded-xl transition-all duration-500 ease-in-out hover:shadow-lg ${
          isBlueTheme
            ? "bg-indigo-600 hover:bg-indigo-600/80 text-white hover:shadow-indigo-600/50"
            : "bg-burnt-orange hover:bg-burnt-orange/80 text-white hover:shadow-burnt-orange/50"
        }`}
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Start Session
      </Button>

      {/* Shine Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none ${
          isBlueTheme ? "via-blue-400/10" : "via-gold/10"
        }`}
      />
    </div>
  );
}
