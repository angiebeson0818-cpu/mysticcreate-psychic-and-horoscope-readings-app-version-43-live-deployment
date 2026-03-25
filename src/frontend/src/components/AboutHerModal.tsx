import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface AboutHerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isBlueTheme?: boolean;
}

export default function AboutHerModal({
  isOpen,
  onClose,
  isBlueTheme = false,
}: AboutHerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-2xl border-2 backdrop-blur-xl transition-all duration-500 ease-in-out ${
          isBlueTheme
            ? "bg-gradient-to-br from-blue-900/95 via-indigo-800/95 to-blue-900/95 border-blue-400/50 shadow-[0_0_60px_rgba(96,165,250,0.4)]"
            : "bg-gradient-to-br from-background/95 via-card/95 to-background/95 border-gold/50 shadow-[0_0_60px_rgba(218,165,32,0.4)]"
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-3xl md:text-4xl font-bold text-center gentle-float transition-all duration-500 ease-in-out ${
              isBlueTheme
                ? "text-blue-300 glowing-title-blue"
                : "text-bright-gold glowing-title"
            }`}
          >
            About Her
          </DialogTitle>
        </DialogHeader>

        <div className="relative p-6 md:p-8">
          {/* Decorative stars */}
          <div
            className={`absolute top-4 left-4 w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ease-in-out ${
              isBlueTheme ? "bg-blue-300" : "bg-gold"
            }`}
          />
          <div
            className={`absolute top-8 right-6 w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ease-in-out ${
              isBlueTheme ? "bg-blue-300" : "bg-gold"
            }`}
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className={`absolute bottom-6 left-8 w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ease-in-out ${
              isBlueTheme ? "bg-blue-300" : "bg-gold"
            }`}
            style={{ animationDelay: "1s" }}
          />
          <div
            className={`absolute bottom-4 right-4 w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ease-in-out ${
              isBlueTheme ? "bg-blue-300" : "bg-gold"
            }`}
            style={{ animationDelay: "1.5s" }}
          />

          {/* Content box with celestial styling */}
          <div
            className={`relative border-2 rounded-lg p-6 md:p-8 transition-all duration-500 ease-in-out ${
              isBlueTheme
                ? "bg-gradient-to-br from-indigo-800/60 to-blue-900/60 border-blue-400/40 shadow-[0_0_40px_rgba(96,165,250,0.3)]"
                : "bg-gradient-to-br from-card/60 to-background/60 border-gold/40 shadow-[0_0_40px_rgba(218,165,32,0.3)]"
            }`}
          >
            <p
              className={`text-lg md:text-xl leading-relaxed text-center space-y-4 transition-colors duration-500 ease-in-out ${
                isBlueTheme ? "text-blue-100" : "text-cream"
              }`}
            >
              <span
                className={`block transition-all duration-500 ease-in-out ${
                  isBlueTheme ? "shimmer-text-blue" : "shimmer-text"
                }`}
              >
                Angela Beson is the founder of CREATE. A mother and strategist,
                Angela designed CREATE for anyone reclaiming their confidence
                and lessening the stress.
              </span>
              <span
                className={`block transition-all duration-500 ease-in-out ${
                  isBlueTheme ? "shimmer-text-blue" : "shimmer-text"
                }`}
                style={{ animationDelay: "0.5s" }}
              >
                Based in Newcastle, OK. She is dedicated to helping you move
                like the most optimized version of yourself!
              </span>
              <span
                className={`block font-bold text-2xl mt-4 transition-all duration-500 ease-in-out ${
                  isBlueTheme
                    ? "text-blue-300 glowing-title-blue"
                    : "text-bright-gold glowing-title"
                }`}
              >
                Buckle Up!
              </span>
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className={`absolute -top-3 -right-3 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ease-in-out hover:scale-110 ${
              isBlueTheme
                ? "bg-blue-400/20 hover:bg-blue-400/40 border-blue-400/50 shadow-[0_0_20px_rgba(96,165,250,0.4)]"
                : "bg-gold/20 hover:bg-gold/40 border-gold/50 shadow-[0_0_20px_rgba(218,165,32,0.4)]"
            }`}
            aria-label="Close"
          >
            <X
              className={`w-5 h-5 transition-colors duration-500 ease-in-out ${
                isBlueTheme ? "text-blue-300" : "text-gold"
              }`}
            />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
