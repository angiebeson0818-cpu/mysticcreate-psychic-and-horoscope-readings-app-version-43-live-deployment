import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetPsychicReading(
  userName: string,
  enabled = false,
  refreshKey = 0,
) {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ["psychicReading", userName, refreshKey],
    queryFn: async () => {
      if (!actor) return "";

      // Enhanced psychic readings with client-side randomization for variety
      const psychicReadingVariations = [
        "You are on the verge of a significant breakthrough. Trust the process and embrace the transformation ahead.",
        "A new opportunity is coming your way. Be ready to embrace it with open arms and a fearless heart.",
        "Your intuition is strong today. Listen to your inner voice—it knows the path forward.",
        "Positive energy surrounds you. Focus on your goals and dreams, and watch them manifest.",
        "A loved one is thinking of you. Reach out and reconnect—the timing is perfect.",
        "Financial stability is within reach. Make wise decisions and trust your instincts.",
        "Personal growth is on the horizon. Embrace change and learning with enthusiasm.",
        "Your creativity is at its peak. Express yourself freely and let your talents shine.",
        "A challenge will turn into a blessing. Stay resilient and trust the journey.",
        "New relationships are forming. Be open to new connections and unexpected friendships.",
        "The celestial forces align in your favor. Trust your path and follow your destiny.",
        "Mystical energies are guiding you towards success. Stay open to signs from the universe.",
        "Your unique talents will bring unexpected rewards. Don't hide your light—let it shine.",
        "A period of transformation is ahead. Embrace the changes with courage and grace.",
        "Your inner strength will help you overcome obstacles. You are more powerful than you know.",
        "The universe is sending you signs. Stay alert and open-minded to divine guidance.",
        "Your efforts will be recognized and appreciated. Keep pushing forward with confidence.",
        "A moment of clarity is coming. Trust your instincts and act on your insights.",
        "Your hard work is about to pay off in surprising ways. Stay patient and persistent.",
        "A sense of peace and balance is within your reach. Breathe deeply and trust the flow.",
        "The veil between worlds is thin today. Your psychic abilities are heightened—trust what you sense.",
        "Someone from your past holds a key to your future. An unexpected reunion brings clarity.",
        "Your dreams are prophetic right now. Pay attention to the messages they contain.",
        "A secret will be revealed that changes everything. Prepare for a shift in perspective.",
        "Your energy is magnetic today. People are drawn to your aura—use this power wisely.",
        "The ancestors are watching over you. Their wisdom flows through your veins.",
        "A karmic cycle is completing. Release what no longer serves you and step into your power.",
        "Your third eye is opening wider. Trust the visions and insights that come to you.",
        "The moon's energy amplifies your intuition. Tonight, meditate and receive divine messages.",
        "A spiritual awakening is unfolding. Embrace the journey and trust the transformation.",
      ];

      // Get truly random variation using Math.random for maximum freshness
      const randomIndex = Math.floor(
        Math.random() * psychicReadingVariations.length,
      );
      const reading = psychicReadingVariations[randomIndex];

      // Personalize the reading
      const personalizedReading =
        userName && userName !== "Seeker"
          ? `${userName}, your personalized psychic reading: ${reading}`
          : `Your personalized psychic reading: ${reading}`;

      return personalizedReading;
    },
    enabled: !!actor && !isFetching && enabled && refreshKey > 0,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

export function useGetHoroscope(sign: string, refreshKey = 0) {
  const { actor, isFetching } = useActor();

  return useQuery<string | null>({
    queryKey: ["horoscope", sign, refreshKey],
    queryFn: async () => {
      if (!actor || !sign) return null;

      // Enhanced horoscope readings with client-side randomization for variety
      const horoscopeVariations: Record<string, string[]> = {
        aries: [
          "Your fire burns brighter than ever, but beware—someone's trying to steal your spark. Channel that warrior energy into something wild. The universe rewards the fearless.",
          "Today is a day of new beginnings. Embrace change and trust your instincts. Your courage will open doors you never knew existed.",
          "The ram charges forward with unstoppable force. Your determination is your superpower today. Don't let anyone dim your flame.",
          "Bold moves bring bold rewards. The cosmos is daring you to take the leap. Your fearless nature will lead you to victory.",
          "Your competitive spirit is at its peak. Channel that energy into your goals. Success is within reach if you stay focused.",
        ],
        taurus: [
          "Comfort is your drug, but today the cosmos is pushing you out of your cozy nest. Embrace the chaos—luxury awaits on the other side of risk.",
          "Stability and comfort are within reach. Focus on your goals and stay grounded. Your patience will be rewarded.",
          "The bull stands firm in the storm. Your steadfast nature is your greatest asset. Trust in your ability to weather any challenge.",
          "Sensual pleasures call to you today. Indulge in the finer things, but remember—true wealth comes from within.",
          "Your practical wisdom guides you through uncertainty. Stay rooted in your values and prosperity will follow.",
        ],
        gemini: [
          "Your dual nature is your superpower today. Stop apologizing for being complex. Someone fascinating is about to enter your orbit—keep your wit sharp.",
          "Communication is key today. Be open to new ideas and connections. Your versatility will serve you well.",
          "The twins dance between worlds with grace. Your adaptability is unmatched. Embrace both sides of your nature.",
          "Curiosity leads you to unexpected discoveries. Follow your interests wherever they take you. Knowledge is power.",
          "Your silver tongue can charm anyone today. Use your words wisely—they have the power to create or destroy.",
        ],
        cancer: [
          "Your emotions run deep, darker than the ocean. Today, let those intense feelings guide you to hidden treasures. Your intuition is screaming—listen.",
          "Emotional growth is on the horizon. Nurture your relationships and self-care. Your sensitivity is a gift.",
          "The crab protects its soft heart with a hard shell. Today, let someone worthy see your vulnerable side.",
          "Your nurturing nature brings healing to those around you. Don't forget to care for yourself as well.",
          "Lunar energies amplify your psychic abilities. Trust your gut feelings—they're never wrong.",
        ],
        leo: [
          "You're the main character today, and everyone knows it. But true power comes from the shadows. Let your mysterious side shine—it's irresistible.",
          "Your confidence will shine. Take bold steps towards your dreams. The spotlight is yours for the taking.",
          "The lion roars with authority and grace. Your natural leadership inspires others to greatness.",
          "Generosity and warmth radiate from you. Share your light with the world, but don't burn yourself out.",
          "Your creative fire burns bright. Express yourself boldly and watch the world take notice.",
        ],
        virgo: [
          "Perfection is overrated. Today, embrace the beautiful mess. Your analytical mind is about to unlock a secret that changes everything.",
          "Attention to detail will bring success. Stay organized and focused. Your precision is your superpower.",
          "The virgin sees what others miss. Your discerning eye catches every flaw and every opportunity.",
          "Service to others brings you fulfillment. But remember—you can't pour from an empty cup.",
          "Your practical magic transforms chaos into order. Trust in your methodical approach.",
        ],
        libra: [
          "Balance is boring—today, tip the scales. Your charm is a weapon; use it strategically. Someone powerful is watching you closely.",
          "Balance is essential today. Seek harmony in your interactions. Your diplomatic skills will resolve conflicts.",
          "The scales seek equilibrium in all things. But sometimes, you must choose a side to move forward.",
          "Beauty and grace surround you. Your aesthetic sense creates harmony wherever you go.",
          "Your ability to see all perspectives is both a gift and a curse. Trust your heart to guide you.",
        ],
        scorpio: [
          "Your intensity scares people, and that's exactly your power. Today, dive deeper into the darkness. What you find there will transform you.",
          "Transformation is coming. Embrace your inner strength and resilience. Your power is undeniable.",
          "The scorpion strikes with precision and purpose. Your penetrating gaze sees through all deception.",
          "Passion and obsession fuel your journey. Channel that intensity into your goals and watch magic happen.",
          "Your mysterious nature draws others in like moths to a flame. Use your magnetism wisely.",
        ],
        sagittarius: [
          "Your wild spirit is calling you toward adventure. The universe is daring you to take a leap. Say yes to the unknown—magic awaits.",
          "Adventure awaits. Be open to new experiences and opportunities. Your optimism lights the way.",
          "The archer aims for distant horizons. Your wanderlust leads you to profound truths.",
          "Freedom is your birthright. Don't let anyone cage your spirit. The world is yours to explore.",
          "Your philosophical nature seeks meaning in everything. Today, you'll find answers in unexpected places.",
        ],
        capricorn: [
          "Your ambition is sexy, and today it's unstoppable. But remember—the most powerful moves are made in silence. Plot your takeover wisely.",
          "Hard work will pay off. Stay determined and persistent. Your discipline is your greatest asset.",
          "The goat climbs the mountain with unwavering focus. Your determination knows no bounds.",
          "Success is built brick by brick. Your patient approach ensures lasting achievement.",
          "Your strategic mind sees the long game. Trust in your plan and execute with precision.",
        ],
        aquarius: [
          "Your weird is your wonderful. Today, let your freak flag fly high. The universe rewards those who dare to be different. Shock them all.",
          "Innovation is your strength. Think outside the box and embrace change. Your unique perspective is needed.",
          "The water bearer pours wisdom upon the world. Your revolutionary ideas will change everything.",
          "Your humanitarian spirit seeks to uplift humanity. Don't lose yourself in the collective.",
          "Unconventional approaches lead to breakthrough solutions. Trust your genius.",
        ],
        pisces: [
          "Your dreams are portals to other dimensions. Today, the veil is thin—trust your visions. Your psychic abilities are off the charts right now.",
          "Intuition will guide you. Trust your instincts and follow your heart. Your empathy is a superpower.",
          "The fish swims between worlds with ease. Your connection to the mystical realm is strongest today.",
          "Your compassion heals wounded souls. But remember to protect your own energy.",
          "Artistic inspiration flows through you like water. Create something beautiful today.",
        ],
      };

      // Get client-side random variation for maximum uniqueness
      const variations = horoscopeVariations[sign.toLowerCase()] || [];
      if (variations.length > 0) {
        const randomIndex = Math.floor(Math.random() * variations.length);
        return variations[randomIndex];
      }

      // Fallback
      return "The stars are aligning for you today. Trust your journey.";
    },
    enabled: !!actor && !isFetching && !!sign && refreshKey > 0,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

export function useGetLoveHoroscope(sign: string, refreshKey = 0) {
  const { actor, isFetching } = useActor();

  return useQuery<string | null>({
    queryKey: ["loveHoroscope", sign, refreshKey],
    queryFn: async () => {
      if (!actor || !sign) return null;

      // Love horoscope readings with client-side randomization - sexy and creative
      const loveHoroscopeVariations: Record<string, string[]> = {
        aries: [
          "Your passion is magnetic today. Someone's been fantasizing about you—and they're closer than you think. Make the first move; they're waiting for your fire.",
          "A passionate encounter awaits. Express your feelings openly. Your boldness in love will be rewarded.",
          "Your fiery nature ignites desire in others. Don't hold back—show them what you're made of.",
          "Spontaneous romance is in the air. Take a risk and watch sparks fly.",
          "Your confidence is the ultimate aphrodisiac. Own your power and let them worship you.",
        ],
        taurus: [
          "Sensuality is your language today. Touch, taste, and indulge in pleasure. A slow burn is building with someone special—let it simmer.",
          "Stability in love is possible. Build trust through communication. Your loyalty is deeply attractive.",
          "Your earthy sensuality draws admirers like bees to honey. Indulge in physical pleasures.",
          "Romantic gestures speak louder than words. Show your affection through tangible acts of love.",
          "Your patient approach to love creates lasting connections. Good things come to those who wait.",
        ],
        gemini: [
          "Your words are seduction itself. Flirt shamelessly—your wit is irresistible right now. A playful connection could turn into something deliciously intense.",
          "Flirting brings fun and excitement. Enjoy playful connections. Your charm is at its peak.",
          "Mental stimulation is your foreplay. Engage in witty banter and watch the chemistry ignite.",
          "Your versatility in love keeps things exciting. Surprise your partner with something unexpected.",
          "Communication is the key to unlocking deeper intimacy. Share your desires openly.",
        ],
        cancer: [
          "Your emotional depth is intoxicating. Someone wants to dive into your waters. Let them in—vulnerability is the ultimate aphrodisiac.",
          "Emotional bonds deepen. Nurture your relationships gently. Your caring nature is deeply appreciated.",
          "Your nurturing touch heals and arouses. Create a safe space for intimate connection.",
          "Lunar energies heighten your romantic intuition. Trust your feelings about that special someone.",
          "Your protective nature makes others feel cherished. Show them your soft side.",
        ],
        leo: [
          "You're radiating pure magnetism. All eyes are on you, but one gaze burns hotter than the rest. Command attention and watch them fall.",
          "Romantic gestures will be appreciated. Show your affection boldly. Your generosity in love is unmatched.",
          "Your regal presence demands admiration. Let someone worthy bask in your golden glow.",
          "Grand romantic gestures come naturally to you. Sweep them off their feet with your passion.",
          "Your confidence in the bedroom is legendary. Own your desires and express them freely.",
        ],
        virgo: [
          "Your attention to detail extends to pleasure. Someone appreciates your perfectionism in all the right ways. Tonight, let go of control.",
          "Attention to detail strengthens connections. Small acts matter. Your thoughtfulness is deeply romantic.",
          "Your skilled touch knows exactly what your partner needs. Precision meets passion.",
          "Service-oriented love is your specialty. Show your devotion through acts of care.",
          "Your analytical mind can map the landscape of pleasure. Explore every possibility.",
        ],
        libra: [
          "Your charm is lethal today. You could seduce anyone with just a smile. But the real question is—who's worthy of your attention?",
          "Balance in love is essential. Seek harmony with your partner. Your diplomatic nature creates peace.",
          "Your aesthetic appreciation extends to romance. Create beauty in your intimate moments.",
          "Your ability to please and be pleased creates perfect harmony. Give and receive equally.",
          "Your refined taste in partners attracts quality connections. Don't settle for less than you deserve.",
        ],
        scorpio: [
          "Your intensity is off the charts. Someone's obsessed with you, and the feeling might be mutual. This connection is primal—embrace it.",
          "Intensity in romance is high. Embrace vulnerability and passion. Your depth creates powerful bonds.",
          "Your magnetic sexuality is impossible to resist. Own your power and let them feel your intensity.",
          "Transformative intimacy awaits. Merge with your partner on every level.",
          "Your penetrating gaze sees into their soul. Use your insight to deepen the connection.",
        ],
        sagittarius: [
          "Adventure and romance collide today. A spontaneous encounter could ignite something wild. Say yes to the unexpected—passion awaits.",
          "Adventure together brings joy. Explore new experiences as a couple. Your enthusiasm is contagious.",
          "Your free spirit attracts fellow adventurers. Find someone who can keep up with your pace.",
          "Playful romance is your style. Keep things light and fun while the passion builds.",
          "Your honesty in love is refreshing. Speak your truth and find someone who appreciates it.",
        ],
        capricorn: [
          "Your power is the ultimate turn-on. Someone's attracted to your ambition and strength. Let them worship at your altar.",
          "Commitment and loyalty shine. Build a solid foundation. Your dedication to love is admirable.",
          "Your controlled exterior hides volcanic passion. Let someone worthy see your wild side.",
          "Your traditional approach to romance creates stability. Build something lasting.",
          "Your success is sexy. Own your achievements and attract someone who matches your ambition.",
        ],
        aquarius: [
          "Your uniqueness is magnetic. Someone's fascinated by your mind and body. Intellectual chemistry is about to get physical.",
          "Unconventional approaches spice up relationships. Try new things. Your originality keeps love exciting.",
          "Your detached coolness is mysteriously attractive. Let someone break through your walls.",
          "Friendship-based romance is your ideal. Find someone who gets your quirky nature.",
          "Your progressive views on love attract like-minded souls. Don't compromise your values.",
        ],
        pisces: [
          "Your mystical energy is enchanting. Someone's under your spell and doesn't want to break free. Let your fantasies become reality.",
          "Dreamy romance is in store. Let your imagination lead the way. Your empathy creates deep connections.",
          "Your ethereal beauty captivates admirers. Use your intuition to find true love.",
          "Your romantic idealism creates fairy tale moments. Don't lose yourself in the fantasy.",
          "Your psychic connection with your partner deepens. You know what they need before they ask.",
        ],
      };

      // Get client-side random variation for maximum uniqueness
      const variations = loveHoroscopeVariations[sign.toLowerCase()] || [];
      if (variations.length > 0) {
        const randomIndex = Math.floor(Math.random() * variations.length);
        return variations[randomIndex];
      }

      // Fallback
      return "Love is in the stars for you today. Open your heart.";
    },
    enabled: !!actor && !isFetching && !!sign && refreshKey > 0,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
