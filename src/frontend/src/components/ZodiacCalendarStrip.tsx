import { useState } from "react";

interface ZodiacCalendarStripProps {
  isBlueTheme?: boolean;
}

interface ZodiacSign {
  name: string;
  symbol: string;
  dates: string;
}

const zodiacSigns: ZodiacSign[] = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20" },
  { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21" },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20" },
];

export default function ZodiacCalendarStrip({
  isBlueTheme = false,
}: ZodiacCalendarStripProps) {
  const [activeSign, setActiveSign] = useState<string | null>(null);

  const handleSignClick = (signName: string) => {
    setActiveSign(signName);
    setTimeout(() => setActiveSign(null), 500);
  };

  return (
    <div className="w-full mb-12 px-4">
      <div
        className={`max-w-7xl mx-auto rounded-2xl border-2 backdrop-blur-sm p-6 transition-all duration-500 ease-in-out ${
          isBlueTheme
            ? "bg-gradient-to-r from-indigo-900/30 via-blue-800/30 to-indigo-900/30 border-blue-400/40"
            : "bg-gradient-to-r from-background/30 via-card/30 to-background/30 border-gold/40"
        }`}
      >
        {/* Title */}
        <h2
          className={`text-center text-xl md:text-2xl font-bold mb-6 transition-colors duration-500 ease-in-out ${
            isBlueTheme ? "text-blue-300" : "text-gold"
          }`}
        >
          Zodiac Sign Calendar
        </h2>

        {/* Zodiac Signs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {zodiacSigns.map((sign) => (
            <button
              type="button"
              key={sign.name}
              onClick={() => handleSignClick(sign.name)}
              className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 backdrop-blur-sm transition-all duration-500 ease-in-out cursor-pointer ${
                activeSign === sign.name
                  ? isBlueTheme
                    ? "scale-110 bg-indigo-600/60 border-blue-300 shadow-[0_0_30px_rgba(96,165,250,0.6)]"
                    : "scale-110 bg-burnt-orange/60 border-gold shadow-[0_0_30px_rgba(218,165,32,0.6)]"
                  : isBlueTheme
                    ? "bg-indigo-800/20 border-blue-400/30 hover:bg-indigo-700/30 hover:border-blue-400/50 hover:scale-105"
                    : "bg-card/20 border-gold/30 hover:bg-card/30 hover:border-gold/50 hover:scale-105"
              }`}
              aria-label={`${sign.name}: ${sign.dates}`}
            >
              {/* Symbol */}
              <div
                className={`text-4xl mb-2 transition-all duration-500 ease-in-out ${
                  activeSign === sign.name
                    ? isBlueTheme
                      ? "text-blue-200 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                      : "text-bright-gold drop-shadow-[0_0_10px_rgba(218,165,32,0.8)]"
                    : isBlueTheme
                      ? "text-blue-300 group-hover:text-blue-200"
                      : "text-gold group-hover:text-bright-gold"
                }`}
              >
                {sign.symbol}
              </div>

              {/* Name */}
              <div
                className={`text-sm font-bold mb-1 transition-colors duration-500 ease-in-out ${
                  isBlueTheme ? "text-blue-200" : "text-cream"
                }`}
              >
                {sign.name}
              </div>

              {/* Dates */}
              <div
                className={`text-xs transition-colors duration-500 ease-in-out ${
                  isBlueTheme ? "text-blue-300/80" : "text-sage"
                }`}
              >
                {sign.dates}
              </div>

              {/* Decorative glow on active */}
              {activeSign === sign.name && (
                <div
                  className={`absolute inset-0 rounded-xl transition-opacity duration-500 ease-in-out ${
                    isBlueTheme
                      ? "bg-blue-400/10 shadow-[inset_0_0_20px_rgba(96,165,250,0.3)]"
                      : "bg-gold/10 shadow-[inset_0_0_20px_rgba(218,165,32,0.3)]"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
