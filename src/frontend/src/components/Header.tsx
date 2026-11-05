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
