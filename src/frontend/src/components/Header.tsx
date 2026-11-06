import { Sparkles } from "lucide-react";

interface HeaderProps {
  isBlueTheme?: boolean;
}

export default function Header({ isBlueTheme = false }: HeaderProps) {
  return (
    <header
      className={`py-6 px-4 backdrop-blur-sm border-b transition-all duration-500 ease-in-out ${
        isBlueTheme
          ? "bg-neutral-950/20 border-amber-100/20"
          : "bg-background/20 border-gold/20"
      }`}
    >
      <div className="container mx-auto flex items-center justify-center gap-3">
        <a
          href="https://angieCREATEs.PRO"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="mysticCREATE by angieCREATEs. Visit angieCREATEs.PRO"
          className="shrink-0 rounded-full transition-transform duration-300 hover:scale-110"
        >
          <img
            src="/assets/brand/mysticcreate-badge.webp"
            alt="mysticCREATE logo"
            width={48}
            height={48}
            className={`w-12 h-12 rounded-full ${
              isBlueTheme
                ? "shadow-[0_0_18px_rgba(245,232,199,0.45)]"
                : "shadow-[0_0_18px_rgba(218,165,32,0.55)]"
            }`}
          />
        </a>
        <Sparkles
          className={`w-8 h-8 animate-pulse transition-colors duration-500 ease-in-out ${
            isBlueTheme ? "text-amber-100" : "text-gold"
          }`}
        />
        <h1
          className={`text-3xl font-bold transition-colors duration-500 ease-in-out ${
            isBlueTheme ? "text-amber-100" : "text-gold"
          }`}
        >
          mysticCREATE
        </h1>
        <Sparkles
          className={`w-8 h-8 animate-pulse transition-colors duration-500 ease-in-out ${
            isBlueTheme ? "text-amber-100" : "text-gold"
          }`}
        />
      </div>
    </header>
  );
}
