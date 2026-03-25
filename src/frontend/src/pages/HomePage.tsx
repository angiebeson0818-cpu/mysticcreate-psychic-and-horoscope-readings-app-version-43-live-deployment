import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HoroscopeModal from "@/components/HoroscopeModal";
import HoroscopeReadingCard from "@/components/HoroscopeReadingCard";
import PsychicReadingCard from "@/components/PsychicReadingCard";
import PsychicReadingModal from "@/components/PsychicReadingModal";
import ZenMusicPlayer from "@/components/ZenMusicPlayer";
import ZodiacCalendarStrip from "@/components/ZodiacCalendarStrip";
import { Moon } from "lucide-react";
import { useState } from "react";

// Pre-generate stable star positions so keys are deterministic
const STARS = Array.from({ length: 50 }, (_, i) => ({
  id: `star-${i}`,
  left: `${(i * 37 + 13) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: `${(i * 0.17) % 3}s`,
  duration: `${2 + ((i * 0.11) % 2)}s`,
}));

export default function HomePage() {
  const [isPsychicModalOpen, setIsPsychicModalOpen] = useState(false);
  const [isHoroscopeModalOpen, setIsHoroscopeModalOpen] = useState(false);
  const [isBlueTheme, setIsBlueTheme] = useState(false);

  const toggleCelestialTheme = () => {
    setIsBlueTheme(!isBlueTheme);
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${isBlueTheme ? "celestial-blue-theme" : "celestial-gold-theme"}`}
    >
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Celestial Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/assets/generated/celestial-background.dim_1920x1080.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            isBlueTheme
              ? "bg-gradient-to-b from-blue-900/60 via-blue-800/70 to-indigo-900/80"
              : "bg-gradient-to-b from-background/40 via-background/60 to-background/80"
          }`}
        />
      </div>

      {/* Moondress Watermark Overlay */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none moondress-watermark">
        <img
          src="/assets/uploads/ang_sun_moondress-1-2-1.jpg"
          alt=""
          className="h-[85vh] w-auto object-contain"
        />
      </div>

      {/* Logo Watermark */}
      <div className="fixed inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
        <img
          src="/assets/1764851081703.jpg"
          alt=""
          className="w-[800px] h-auto object-contain"
        />
      </div>

      {/* Animated Stars */}
      <div className="stars-container">
        {STARS.map((star) => (
          <div
            key={star.id}
            className={`star ${isBlueTheme ? "star-blue" : ""}`}
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* Zen Music Player — positioned above the moon toggle */}
      <ZenMusicPlayer isBlueTheme={isBlueTheme} />

      {/* Clickable Moon Toggle Button */}
      <button
        type="button"
        onClick={toggleCelestialTheme}
        className="fixed bottom-24 right-6 z-50 group cursor-pointer"
        aria-label="Toggle celestial theme"
      >
        <div
          className={`w-12 h-12 rounded-full transition-all duration-500 ease-in-out ${
            isBlueTheme ? "celestial-orb-blue" : "celestial-orb-gold"
          } hover:scale-110 active:scale-95`}
        >
          <Moon
            className={`w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ease-in-out ${
              isBlueTheme ? "text-blue-200" : "text-yellow-200"
            }`}
          />
        </div>
      </button>

      {/* Content */}
      <div className="relative z-10">
        <Header isBlueTheme={isBlueTheme} />

        <main className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]">
          {/* Hero Title */}
          <div className="text-center mb-16 gentle-float">
            <h1
              className={`text-5xl md:text-7xl font-bold mb-4 transition-all duration-500 ease-in-out ${
                isBlueTheme
                  ? "text-blue-300 glowing-title-blue"
                  : "text-bright-gold glowing-title"
              }`}
            >
              mysticCREATE Readings
            </h1>
            <p
              className={`text-2xl md:text-3xl font-semibold gentle-float-delayed transition-colors duration-500 ease-in-out ${
                isBlueTheme ? "text-blue-200" : "text-cream"
              }`}
            >
              Your Path, Unveiled
            </p>
          </div>

          {/* Zodiac Sign Calendar Strip */}
          <ZodiacCalendarStrip isBlueTheme={isBlueTheme} />

          {/* Main Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PsychicReadingCard
              onOpen={() => setIsPsychicModalOpen(true)}
              isBlueTheme={isBlueTheme}
            />
            <HoroscopeReadingCard
              onOpen={() => setIsHoroscopeModalOpen(true)}
              isBlueTheme={isBlueTheme}
            />
          </div>
        </main>

        <Footer isBlueTheme={isBlueTheme} />
      </div>

      {/* Modals */}
      <PsychicReadingModal
        isOpen={isPsychicModalOpen}
        onClose={() => setIsPsychicModalOpen(false)}
        isBlueTheme={isBlueTheme}
      />
      <HoroscopeModal
        isOpen={isHoroscopeModalOpen}
        onClose={() => setIsHoroscopeModalOpen(false)}
        isBlueTheme={isBlueTheme}
      />
    </div>
  );
}
