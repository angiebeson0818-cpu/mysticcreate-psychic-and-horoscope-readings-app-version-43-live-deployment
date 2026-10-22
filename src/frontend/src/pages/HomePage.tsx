import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HoroscopeModal from "@/components/HoroscopeModal";
import HoroscopeReadingCard from "@/components/HoroscopeReadingCard";
import PsychicReadingCard from "@/components/PsychicReadingCard";
import PsychicReadingModal from "@/components/PsychicReadingModal";
import SmoothScroll from "@/components/SmoothScroll";
import ZenMusicPlayer from "@/components/ZenMusicPlayer";
import ZodiacCalendarStrip from "@/components/ZodiacCalendarStrip";
import ClickSpark from "@/components/reactbits/ClickSpark";
import ShinyText from "@/components/reactbits/ShinyText";
import SplitText from "@/components/reactbits/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Moon } from "lucide-react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const mainRef = useRef<HTMLElement>(null);

  // Scroll-driven reveals for the calendar strip and feature cards
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el, i) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 60,
            scale: 0.96,
            filter: "blur(8px)",
            duration: 1.1,
            delay: (i % 2) * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: mainRef },
  );

  const toggleCelestialTheme = () => {
    setIsBlueTheme(!isBlueTheme);
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${isBlueTheme ? "celestial-blue-theme" : "celestial-gold-theme"}`}
    >
      {/* Smooth Scroll + Custom Cursor */}
      <SmoothScroll />
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

      {/* Content — gold star sparks on every click */}
      <ClickSpark
        className="relative z-10"
        style={{ height: "auto" }}
        shape="star"
        sparkColor={
          isBlueTheme
            ? ["#bfdbfe", "#93c5fd", "#ffffff"]
            : ["#F7E7A1", "#D4AF37", "#F5E6C8"]
        }
        sparkCount={10}
        sparkSize={12}
        sparkRadius={28}
        glow={0.8}
        ring
      >
        <Header isBlueTheme={isBlueTheme} />

        <main
          ref={mainRef}
          className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]"
        >
          {/* Hero Title */}
          <div className="text-center mb-16 gentle-float">
            <SplitText
              tag="h1"
              text="mysticCREATE Readings"
              trigger="load"
              effect="blur"
              splitType="chars"
              staggerFrom="center"
              delay={45}
              duration={1.1}
              hoverEffect="wave"
              className={`block w-full text-5xl md:text-7xl font-bold mb-4 transition-colors duration-500 ease-in-out ${
                isBlueTheme
                  ? "text-blue-300 glowing-title-blue"
                  : "text-bright-gold glowing-title"
              }`}
            />
            <p className="text-2xl md:text-3xl font-semibold gentle-float-delayed">
              <ShinyText
                text="Your Path, Unveiled"
                color={isBlueTheme ? "#bfdbfe" : "#F5E6C8"}
                shineColor={isBlueTheme ? "#ffffff" : "#FFD700"}
                speed={3}
                delay={1.2}
                shineWidth={30}
                glow={0.4}
              />
            </p>
          </div>

          {/* Zodiac Sign Calendar Strip */}
          <div data-reveal>
            <ZodiacCalendarStrip isBlueTheme={isBlueTheme} />
          </div>

          {/* Main Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div data-reveal>
              <PsychicReadingCard
                onOpen={() => setIsPsychicModalOpen(true)}
                isBlueTheme={isBlueTheme}
              />
            </div>
            <div data-reveal>
              <HoroscopeReadingCard
                onOpen={() => setIsHoroscopeModalOpen(true)}
                isBlueTheme={isBlueTheme}
              />
            </div>
          </div>
        </main>

        <Footer isBlueTheme={isBlueTheme} />
      </ClickSpark>

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
