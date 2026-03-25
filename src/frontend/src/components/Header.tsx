import { Sparkles } from "lucide-react";

interface HeaderProps {
  isBlueTheme?: boolean;
}

export default function Header({ isBlueTheme = false }: HeaderProps) {
  return (
    <header
      className={`py-6 px-4 backdrop-blur-sm border-b transition-all duration-500 ease-in-out ${
        isBlueTheme
          ? "bg-blue-900/20 border-blue-400/20"
          : "bg-background/20 border-gold/20"
      }`}
    >
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Sparkles
          className={`w-8 h-8 animate-pulse transition-colors duration-500 ease-in-out ${
            isBlueTheme ? "text-blue-300" : "text-gold"
          }`}
        />
        <h1
          className={`text-3xl font-bold transition-colors duration-500 ease-in-out ${
            isBlueTheme ? "text-blue-300" : "text-gold"
          }`}
        >
          mysticCREATE
        </h1>
        <Sparkles
          className={`w-8 h-8 animate-pulse transition-colors duration-500 ease-in-out ${
            isBlueTheme ? "text-blue-300" : "text-gold"
          }`}
        />
      </div>
    </header>
  );
}
