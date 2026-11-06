import {
  Contrast,
  Link2,
  MousePointer2,
  PauseCircle,
  RotateCcw,
  Type,
  WrapText,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

/**
 * Small onyx and gold accessibility button with a settings panel.
 * Each setting toggles a class on <html>; the styles live in index.css.
 * Choices are remembered on this device when storage is available.
 */

interface A11ySettings {
  textSize: 0 | 1 | 2;
  contrast: boolean;
  reduceMotion: boolean;
  spacing: boolean;
  underlineLinks: boolean;
  standardCursor: boolean;
}

const DEFAULTS: A11ySettings = {
  textSize: 0,
  contrast: false,
  reduceMotion: false,
  spacing: false,
  underlineLinks: false,
  standardCursor: false,
};

const STORAGE_KEY = "mysticcreate-a11y";

function loadSettings(): A11ySettings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    // storage unavailable: fall back to defaults
  }
  return DEFAULTS;
}

function applySettings(s: A11ySettings) {
  const root = document.documentElement.classList;
  root.toggle("a11y-text-lg", s.textSize === 1);
  root.toggle("a11y-text-xl", s.textSize === 2);
  root.toggle("a11y-contrast", s.contrast);
  root.toggle("a11y-reduce-motion", s.reduceMotion);
  root.toggle("a11y-spacing", s.spacing);
  root.toggle("a11y-links", s.underlineLinks);
  root.toggle("a11y-standard-cursor", s.standardCursor);
}

interface AccessibilityMenuProps {
  isBlueTheme?: boolean;
}

export default function AccessibilityMenu({
  isBlueTheme = false,
}: AccessibilityMenuProps) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initial = loadSettings();
    setSettings(initial);
    applySettings(initial);
  }, []);

  useEffect(() => {
    applySettings(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore storage errors
    }
  }, [settings]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const toggle = (key: keyof Omit<A11ySettings, "textSize">) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  const accent = isBlueTheme ? "text-amber-100" : "text-gold";
  const ring = isBlueTheme ? "border-amber-100/70" : "border-gold/80";

  const options: {
    key: keyof Omit<A11ySettings, "textSize">;
    label: string;
    icon: typeof Contrast;
  }[] = [
    { key: "contrast", label: "High contrast", icon: Contrast },
    { key: "reduceMotion", label: "Pause animations", icon: PauseCircle },
    { key: "spacing", label: "Easier reading spacing", icon: WrapText },
    { key: "underlineLinks", label: "Underline links", icon: Link2 },
    { key: "standardCursor", label: "Standard cursor", icon: MousePointer2 },
  ];

  return (
    <div className="fixed bottom-3 left-3 z-50">
      {/* Liquid gold orb with a shimmering ribbon (styles in index.css) */}
      <div className={`lg-wrap ${isBlueTheme ? "lg-pearl" : ""}`}>
        <svg className="lg-ribbon" viewBox="0 0 76 76" aria-hidden="true">
          <defs>
            <linearGradient id="lgRibbon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8a6a1f" />
              <stop offset=".45" stopColor="#fff6d5" />
              <stop offset="1" stopColor="#d4af37" />
            </linearGradient>
          </defs>
          <circle cx="38" cy="38" r="35" />
          <circle
            className="lg-thin"
            cx="38"
            cy="38"
            r="35"
            transform="rotate(160 38 38)"
          />
        </svg>
        <i className="lg-spark lg-s1" />
        <i className="lg-spark lg-s2" />
        <i className="lg-spark lg-s3" />
        <span className="lg-ripple lg-r1" />
        <span className="lg-ripple lg-r2" />
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label="Accessibility settings"
          className="lg-orb"
        >
          <span className="lg-wave lg-w1">
            <svg
              viewBox="0 0 200 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 20 Q25 4 50 20 T100 20 T150 20 T200 20 V60 H0Z"
                fill="rgba(160,120,26,.6)"
              />
              <path
                d="M0 20 Q25 4 50 20 T100 20 T150 20 T200 20"
                fill="none"
                stroke="rgba(255,246,213,.85)"
                strokeWidth="1.6"
              />
            </svg>
          </span>
          <span className="lg-wave lg-w2">
            <svg
              viewBox="0 0 200 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 18 Q25 32 50 18 T100 18 T150 18 T200 18 V60 H0Z"
                fill="rgba(110,82,16,.55)"
              />
            </svg>
          </span>
          <span className="lg-gloss" />
          <svg
            className="lg-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="4.2"
              r="1.9"
              fill="currentColor"
              stroke="none"
            />
            <path d="M5 8.5c2.3.7 4.6 1 7 1s4.7-.3 7-1" />
            <path d="M12 9.5v5" />
            <path d="M12 14.5l-3.2 6" />
            <path d="M12 14.5l3.2 6" />
          </svg>
        </button>
      </div>

      {open && (
        <section
          ref={panelRef}
          id={panelId}
          aria-label="Accessibility settings"
          className={`absolute bottom-[86px] left-3 w-72 max-w-[calc(100vw-3rem)] rounded-2xl border-2 bg-onyx/95 backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.6)] ${ring}`}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-lg font-bold ${accent}`}>Accessibility</h2>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              aria-label="Close accessibility settings"
              className="p-1 rounded-full text-cream/80 hover:text-cream"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <fieldset className="mb-3">
            <legend className="flex items-center gap-2 text-sm text-cream/90 mb-2">
              <Type className={`w-4 h-4 ${accent}`} aria-hidden="true" />
              Text size
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {(["Standard", "Large", "Larger"] as const).map((label, i) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={settings.textSize === i}
                  onClick={() =>
                    setSettings((s) => ({ ...s, textSize: i as 0 | 1 | 2 }))
                  }
                  className={`rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors ${
                    settings.textSize === i
                      ? "liquid-gold-fill text-onyx border-transparent"
                      : "border-cream/30 text-cream/90 hover:border-gold/60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <ul className="space-y-1.5">
            {options.map(({ key, label, icon: Icon }) => (
              <li key={key}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings[key]}
                  onClick={() => toggle(key)}
                  className="w-full flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-cream/90 hover:bg-cream/5"
                >
                  <span className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${accent}`} aria-hidden="true" />
                    {label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative w-9 h-5 rounded-full transition-colors ${
                      settings[key] ? "liquid-gold-fill" : "bg-cream/20"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-onyx transition-all ${
                        settings[key] ? "left-[18px]" : "left-0.5"
                      }`}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setSettings(DEFAULTS)}
            className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-cream/30 px-3 py-2 text-xs font-semibold text-cream/90 hover:border-gold/60"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Reset all
          </button>
        </section>
      )}
    </div>
  );
}
