import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Gem,
  Heart,
  MessageCircle,
  Moon,
  Sparkles,
  Sprout,
  Wand2,
} from "lucide-react";
import type { ComponentType } from "react";

interface MysticFeaturesProps {
  isBlueTheme?: boolean;
  onStartReading: () => void;
}

interface Feature {
  id: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    id: "birth-chart",
    icon: Moon,
    title: "Birth Chart Insights",
    body: "Understand your natal chart, personality traits, emotional tendencies, motivations, and inner patterns.",
  },
  {
    id: "love-compatibility",
    icon: Heart,
    title: "Love Compatibility",
    body: "Explore relationship dynamics, communication styles, emotional chemistry, and compatibility with someone important to you.",
  },
  {
    id: "relationship-patterns",
    icon: Gem,
    title: "Relationship Patterns",
    body: "Reflect on recurring habits, emotional patterns, and themes that may shape your love life.",
  },
  {
    id: "soulmate-exploration",
    icon: Wand2,
    title: "Soulmate Exploration",
    body: "Discover partner qualities and relationship themes that may resonate with your ideal connection.",
  },
  {
    id: "ai-companion",
    icon: MessageCircle,
    title: "AI Astrology Companion",
    body: "Ask questions about your chart, emotions, relationships, or personal growth and receive supportive, personalized reflection prompts.",
  },
  {
    id: "self-discovery",
    icon: Sprout,
    title: "Self-Discovery & Personal Growth",
    body: "Build greater self-awareness and turn astrology insights into meaningful reflection.",
  },
];

const SUBSCRIPTION_POINTS = [
  "Plans: VIP Weekly and VIP Annual.",
  "Payment is charged to your Google Play account after purchase confirmation.",
  "Your subscription renews automatically unless canceled at least 24 hours before the end of the current billing period.",
  "Manage or cancel your subscription in Google Play: Payments & subscriptions, then Subscriptions, then mysticCREATE, then Cancel subscription.",
  "Refund requests are reviewed by Google Play according to its refund policies.",
];

export default function MysticFeatures({
  isBlueTheme = false,
  onStartReading,
}: MysticFeaturesProps) {
  const accent = isBlueTheme ? "text-amber-100" : "text-gold";
  const bright = isBlueTheme
    ? "text-amber-100 glowing-title-blue"
    : "text-bright-gold glowing-title";
  const soft = isBlueTheme ? "text-amber-50/90" : "text-cream/90";
  const panel = isBlueTheme
    ? "bg-gradient-to-br from-neutral-800/25 to-neutral-950/50 border-amber-100/40"
    : "bg-gradient-to-br from-black/60 to-background/60 border-gold/40";

  return (
    <section
      aria-labelledby="mystic-intro-title"
      className="max-w-5xl mx-auto mt-20 space-y-16"
    >
      {/* Intro */}
      <div className="text-center space-y-5 px-2">
        <p
          className={`uppercase tracking-[0.25em] text-sm font-semibold ${accent}`}
        >
          Birth chart insights · love compatibility · soulmate sketch · AI
          guidance
        </p>
        <h2
          id="mystic-intro-title"
          className={`text-3xl md:text-5xl font-bold ${bright}`}
        >
          Understand your birth chart, relationship patterns, and love
          compatibility
        </h2>
        <p className={`text-lg md:text-xl max-w-3xl mx-auto ${soft}`}>
          mysticCREATE is an AI astrology and self-discovery app for deeper
          insight into yourself and your connections.
        </p>
        <p className={`text-base md:text-lg max-w-3xl mx-auto ${soft}`}>
          Go beyond generic horoscopes. mysticCREATE turns your natal chart into
          personalized guidance about your personality, emotions, relationships,
          and personal growth. Explore recurring patterns, understand important
          connections, and reflect with an AI companion whenever you need
          clarity.
        </p>
      </div>

      {/* Soulmate Sketch spotlight */}
      <div
        className={`floating-card relative overflow-hidden rounded-3xl p-8 md:p-12 backdrop-blur-md border-2 text-center ${panel}`}
      >
        <Sparkles
          className={`w-10 h-10 mx-auto mb-4 animate-pulse ${accent}`}
          aria-hidden="true"
        />
        <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${bright}`}>
          Discover Soulmate Sketch
        </h3>
        <p className={`text-lg max-w-3xl mx-auto mb-4 ${soft}`}>
          See an AI-generated portrait inspired by your birth chart, along with
          insights into your soulmate's appearance, personality, and how you may
          meet.
        </p>
        <p className={`text-sm italic max-w-2xl mx-auto ${soft}`}>
          Soulmate Sketch is designed for fun, reflection, and romantic
          curiosity, not as a factual prediction.
        </p>
      </div>

      {/* Explore mysticCREATE */}
      <div>
        <h3
          className={`text-3xl md:text-4xl font-bold text-center mb-10 ${bright}`}
        >
          Explore mysticCREATE
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ id, icon: Icon, title, body }) => (
            <article
              key={id}
              className={`group relative overflow-hidden rounded-2xl p-6 backdrop-blur-md border-2 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl ${panel} ${
                isBlueTheme
                  ? "hover:border-amber-100/70 hover:shadow-amber-100/20"
                  : "hover:border-gold/70 hover:shadow-gold/20"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${
                  isBlueTheme ? "celestial-orb-blue" : "celestial-orb-gold"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${isBlueTheme ? "text-amber-50" : "text-yellow-100"}`}
                />
              </div>
              <h4 className={`text-xl font-bold mb-2 ${accent}`}>{title}</h4>
              <p className={soft}>{body}</p>
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none ${
                  isBlueTheme ? "via-amber-100/10" : "via-gold/10"
                }`}
              />
            </article>
          ))}
        </div>
      </div>

      {/* Why mysticCREATE */}
      <div
        className={`rounded-3xl p-8 md:p-12 backdrop-blur-md border-2 ${panel}`}
      >
        <h3
          className={`text-3xl md:text-4xl font-bold text-center mb-6 ${bright}`}
        >
          Why mysticCREATE?
        </h3>
        <p className={`text-lg max-w-3xl mx-auto text-center ${soft}`}>
          mysticCREATE combines astrology, birth chart interpretation, love
          compatibility, and AI-guided reflection in one personal experience.
          Whether you are curious about a new connection, looking back on a past
          relationship, or exploring your inner world, mysticCREATE helps you
          see your patterns more clearly.
        </p>
      </div>

      {/* Call to action */}
      <div className="text-center space-y-6">
        <p className={`text-lg md:text-xl max-w-3xl mx-auto ${soft}`}>
          Download mysticCREATE to explore your birth chart, discover your
          Soulmate Sketch, understand love compatibility, and find new
          perspectives on the relationships that matter most.
        </p>
        <button
          type="button"
          onClick={onStartReading}
          className={`liquid-gold-button ${isBlueTheme ? "liquid-blue" : ""}`}
        >
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          Begin Your Reading
        </button>
      </div>

      {/* Disclaimer + subscription info */}
      <div className="max-w-3xl mx-auto space-y-6">
        <p className={`text-sm text-center italic ${soft}`}>
          mysticCREATE provides astrology-based insights, AI-generated content,
          and self-reflection tools for informational and entertainment purposes
          only. Results are not factual predictions and should not replace
          medical, psychological, legal, or financial advice.
        </p>

        <Accordion
          type="single"
          collapsible
          className={`rounded-2xl px-6 backdrop-blur-md border-2 ${panel}`}
        >
          <AccordionItem value="subscription" className="border-b-0">
            <AccordionTrigger
              className={`text-lg font-semibold hover:no-underline ${accent}`}
            >
              Subscription Information
            </AccordionTrigger>
            <AccordionContent>
              <ul className={`space-y-2 list-disc pl-5 ${soft}`}>
                {SUBSCRIPTION_POINTS.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
