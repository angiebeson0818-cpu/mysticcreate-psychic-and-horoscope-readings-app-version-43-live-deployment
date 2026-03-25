import { Music, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ZenMusicPlayerProps {
  isBlueTheme: boolean;
}

export default function ZenMusicPlayer({ isBlueTheme }: ZenMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const audio = new Audio(
      "https://cdn.pixabay.com/audio/2022/03/10/audio_270f5f9a4d.mp3",
    );
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Attempt autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser — show tooltip hint
          setIsPlaying(false);
          setTimeout(() => setShowTooltip(true), 1500);
        });
    }

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Dismiss tooltip on first user interaction
    setShowTooltip(false);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="fixed bottom-40 right-6 z-50 flex flex-col items-center gap-2">
      {/* Tooltip / badge for blocked autoplay */}
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

      {/* Play/Pause button */}
      <button
        type="button"
        onClick={handleToggle}
        data-ocid="music.toggle"
        aria-label={isPlaying ? "Pause zen music" : "Play zen music"}
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
              transition-colors duration-500 ease-in-out
              ${isBlueTheme ? "text-blue-200" : "text-yellow-200"}
            `}
          />
        ) : (
          <Play
            className={`
              w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              transition-colors duration-500 ease-in-out
              ${isBlueTheme ? "text-blue-200" : "text-yellow-200"}
            `}
          />
        )}
      </button>
    </div>
  );
}
