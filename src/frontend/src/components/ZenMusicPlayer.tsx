import { Music, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MUSIC_SRC =
  "/assets/mysticcreate_first_song_ever-019d4c62-c8ca-75a9-b6db-b3d8f62856d4.mp4";

interface ZenMusicPlayerProps {
  isBlueTheme: boolean;
}

export default function ZenMusicPlayer({ isBlueTheme }: ZenMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Try autoplay
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowTooltip(false);
      })
      .catch(() => {
        // Browser blocked autoplay — show tooltip until user taps
        setShowTooltip(true);
      });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const handleToggle = () => {
    setShowTooltip(false);
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-40 right-6 z-50 flex flex-col items-center gap-2">
      {showTooltip && !isPlaying && (
        <div
          className={`
            absolute bottom-16 right-0 whitespace-nowrap
            text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg
            animate-pulse pointer-events-none
            ${
              isBlueTheme
                ? "bg-blue-900/90 text-blue-200 border border-blue-400/40"
                : "bg-amber-900/90 text-yellow-200 border border-yellow-500/40"
            }
          `}
        >
          Tap to play music ✨
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className={`
          relative w-12 h-12 rounded-full
          hover:scale-110 active:scale-95 transition-all duration-500
          ${isBlueTheme ? "celestial-orb-blue" : "celestial-orb-gold"}
        `}
      >
        <Music
          className={`
            w-3 h-3 absolute top-1 right-1 opacity-60
            ${isBlueTheme ? "text-blue-300" : "text-yellow-300"}
          `}
        />
        {isPlaying ? (
          <Pause
            className={`
              w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              ${isBlueTheme ? "text-blue-200" : "text-yellow-200"}
            `}
          />
        ) : (
          <Play
            className={`
              w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              ${isBlueTheme ? "text-blue-200" : "text-yellow-200"}
            `}
          />
        )}
      </button>
    </div>
  );
}
