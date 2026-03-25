import Map "mo:core/Map";
import List "mo:core/List";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat32 "mo:core/Nat32";
import Nat "mo:core/Nat";

actor {
  stable let readingsStartDate : Int = 1_893_456_151_000_000_000;

  let dailyHoroscopes = Map.fromIter(
    [
      ("aries", "Today is a day of new beginnings. Embrace change and trust your instincts."),
      ("taurus", "Stability and comfort are within reach. Focus on your goals and stay grounded."),
      ("gemini", "Communication is key today. Be open to new ideas and connections."),
      ("cancer", "Emotional growth is on the horizon. Nurture your relationships and self-care."),
      ("leo", "Your confidence will shine. Take bold steps towards your dreams."),
      ("virgo", "Attention to detail will bring success. Stay organized and focused."),
      ("libra", "Balance is essential today. Seek harmony in your interactions."),
      ("scorpio", "Transformation is coming. Embrace your inner strength and resilience."),
      ("sagittarius", "Adventure awaits. Be open to new experiences and opportunities."),
      ("capricorn", "Hard work will pay off. Stay determined and persistent."),
      ("aquarius", "Innovation is your strength. Think outside the box and embrace change."),
      ("pisces", "Intuition will guide you. Trust your instincts and follow your heart."),
    ].values()
  );

  let loveHoroscopes = Map.fromIter(
    [
      ("aries", "A passionate encounter awaits. Express your feelings openly."),
      ("taurus", "Stability in love is possible. Build trust through communication."),
      ("gemini", "Flirting brings fun and excitement. Enjoy playful connections."),
      ("cancer", "Emotional bonds deepen. Nurture your relationships gently."),
      ("leo", "Romantic gestures will be appreciated. Show your affection boldly."),
      ("virgo", "Attention to detail strengthens connections. Small acts matter."),
      ("libra", "Balance in love is essential. Seek harmony with your partner."),
      ("scorpio", "Intensity in romance is high. Embrace vulnerability and passion."),
      ("sagittarius", "Adventure together brings joy. Explore new experiences as a couple."),
      ("capricorn", "Commitment and loyalty shine. Build a solid foundation."),
      ("aquarius", "Unconventional approaches spice up relationships. Try new things."),
      ("pisces", "Dreamy romance is in store. Let your imagination lead the way."),
    ].values()
  );

  let psychicReadings = List.fromArray([
    "You are on the verge of a significant breakthrough. Trust the process.",
    "A new opportunity is coming your way. Be ready to embrace it.",
    "Your intuition is strong today. Listen to your inner voice.",
    "Positive energy surrounds you. Focus on your goals and dreams.",
    "A loved one is thinking of you. Reach out and reconnect.",
    "Financial stability is within reach. Make wise decisions.",
    "Personal growth is on the horizon. Embrace change and learning.",
    "Your creativity is at its peak. Express yourself freely.",
    "A challenge will turn into a blessing. Stay resilient.",
    "New relationships are forming. Be open to new connections.",
    "The celestial forces align in your favor. Trust your path.",
    "Mystical energies are guiding you towards success.",
    "Your unique talents will bring unexpected rewards.",
    "A period of transformation is ahead. Embrace the changes.",
    "Your inner strength will help you overcome obstacles.",
    "The universe is sending you signs. Stay alert and open-minded.",
    "Your efforts will be recognized and appreciated.",
    "A moment of clarity is coming. Trust your instincts.",
    "Your hard work is about to pay off in surprising ways.",
    "A sense of peace and balance is within your reach.",
  ]);

  func getRandomIndex(max : Nat) : Nat {
    let now = Time.now();
    let seed = (now % 1_000_000).toNat();
    if (max == 0) { 0 } else {
      seed % max;
    };
  };

  func getRandomElement(list : List.List<Text>) : Text {
    if (list.isEmpty()) { return "" };
    let array = list.toArray();
    let idx = getRandomIndex(array.size());
    array[idx];
  };

  public func getDailyHoroscope(sign : Text) : async ?Text {
    let randomIndex = getRandomIndex(dailyHoroscopes.size());
    let entries = dailyHoroscopes.toArray();

    if (entries.size() > 0) {
      let (_, randomHoroscope) = entries[randomIndex % entries.size()];
      ?randomHoroscope;
    } else {
      ?"No horoscope found";
    };
  };

  public func getLoveHoroscope(sign : Text) : async ?Text {
    let randomIndex = getRandomIndex(loveHoroscopes.size());
    let entries = loveHoroscopes.toArray();

    if (entries.size() > 0) {
      let (_, randomHoroscope) = entries[randomIndex % entries.size()];
      ?randomHoroscope;
    } else {
      ?"No love horoscope found";
    };
  };

  public query ({ caller }) func getNewPsychicReading(username : Text) : async Text {
    let reading = getRandomElement(psychicReadings);
    username # ", your personalized psychic reading: " # reading;
  };

  public query ({ caller }) func getRandomGeneralReading() : async Text {
    if (psychicReadings.isEmpty()) {
      "No readings are available at the moment. Please try again later.";
    } else {
      getRandomElement(psychicReadings);
    };
  };
};
