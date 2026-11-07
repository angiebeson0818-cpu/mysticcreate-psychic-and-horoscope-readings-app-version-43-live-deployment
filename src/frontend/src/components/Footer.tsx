import { Heart } from "lucide-react";
import { useState } from "react";
import AboutHerModal from "./AboutHerModal";

interface FooterProps {
  isBlueTheme?: boolean;
}

export default function Footer({ isBlueTheme = false }: FooterProps) {
  const [isAboutHerModalOpen, setIsAboutHerModalOpen] = useState(false);

  return (
    <>
      <footer
        className={`py-8 px-4 backdrop-blur-sm border-t transition-all duration-500 ease-in-out ${
          isBlueTheme
            ? "bg-neutral-950/20 border-amber-100/20"
            : "bg-background/20 border-gold/20"
        }`}
      >
        <div className="container mx-auto text-center space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* About Her photo - opens the About Her window */}
            <div className="relative order-1 md:order-1">
              <button
                type="button"
                onClick={() => setIsAboutHerModalOpen(true)}
                className="group relative cursor-pointer transition-all duration-500 ease-in-out hover:scale-105"
                aria-label="Learn about Angela Beson"
              >
                <img
                  src="/assets/brand/angie-about.webp"
                  alt="Angela Beson - Click to learn more"
                  className={`w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 object-cover object-top rounded-lg transition-all duration-500 ease-in-out ${
                    isBlueTheme
                      ? "shadow-[0_0_30px_rgba(245,232,199,0.4)] border border-amber-100/40 group-hover:shadow-[0_0_50px_rgba(245,232,199,0.7)] group-hover:border-amber-100/70"
                      : "shadow-[0_0_30px_rgba(218,165,32,0.3)] border border-gold/30 group-hover:shadow-[0_0_50px_rgba(218,165,32,0.6)] group-hover:border-gold/60"
                  }`}
                  style={{
                    filter: isBlueTheme
                      ? "drop-shadow(0 0 20px rgba(245,232,199,0.5))"
                      : "drop-shadow(0 0 20px rgba(218, 165, 32, 0.4))",
                    transition: "filter 0.5s ease-in-out",
                  }}
                />
                {/* Hover overlay hint */}
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-500 ease-in-out flex items-center justify-center ${
                    isBlueTheme
                      ? "bg-amber-100/0 group-hover:bg-amber-100/10"
                      : "bg-gold/0 group-hover:bg-gold/10"
                  }`}
                >
                  <span
                    className={`font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-background/80 px-3 py-1 rounded-full ${
                      isBlueTheme
                        ? "text-amber-100 border border-amber-100/50"
                        : "text-bright-gold border border-gold/50"
                    }`}
                  >
                    About Her
                  </span>
                </div>
              </button>
            </div>

            {/* Center content with logo and signature */}
            <div className="flex flex-col items-center gap-4 order-2 md:order-2">
              <a
                href="https://angieCREATEs.PRO"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit angieCREATEs.PRO"
                className="relative block rounded-full transition-transform duration-500 ease-in-out hover:scale-105"
              >
                <img
                  src="/assets/brand/mysticcreate-c-logo.webp"
                  alt="mysticCREATE logo"
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full object-contain shadow-lg transition-all duration-500 ease-in-out ${
                    isBlueTheme
                      ? "shadow-[0_0_30px_rgba(245,232,199,0.35)]"
                      : "shadow-[0_0_30px_rgba(218,165,32,0.45)]"
                  }`}
                />
              </a>
              <p
                className={`text-lg sm:text-xl font-semibold transition-all duration-500 ease-in-out ${
                  isBlueTheme
                    ? "text-amber-100 shimmer-text-blue"
                    : "text-gold shimmer-text"
                }`}
              >
                made with love by angieCREATEs
              </p>
            </div>
          </div>

          <p
            className={`flex items-center justify-center gap-2 flex-wrap text-sm sm:text-base transition-colors duration-500 ease-in-out ${
              isBlueTheme ? "text-amber-50/80" : "text-cream/80"
            }`}
          >
            <span>© 2026 angieCREATEs. Made with</span>
            <Heart className="w-4 h-4 text-gold fill-gold animate-pulse" />
            <span>for every seeker.</span>
            <a
              href="https://angieCREATEs.PRO"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-500 ease-in-out underline ${
                isBlueTheme
                  ? "text-amber-100 hover:text-amber-100/80"
                  : "text-gold hover:text-gold/80"
              }`}
            >
              angieCREATEs.PRO
            </a>
          </p>
        </div>
      </footer>

      {/* About Her Modal */}
      <AboutHerModal
        isOpen={isAboutHerModalOpen}
        onClose={() => setIsAboutHerModalOpen(false)}
        isBlueTheme={isBlueTheme}
      />
    </>
  );
}
