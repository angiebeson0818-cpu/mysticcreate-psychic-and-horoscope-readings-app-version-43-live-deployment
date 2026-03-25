import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetHoroscope, useGetLoveHoroscope } from "@/hooks/useQueries";
import { Heart, Loader2, Moon, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface HoroscopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isBlueTheme?: boolean;
}

const zodiacSigns = [
  { value: "aries", label: "Aries ♈", emoji: "♈" },
  { value: "taurus", label: "Taurus ♉", emoji: "♉" },
  { value: "gemini", label: "Gemini ♊", emoji: "♊" },
  { value: "cancer", label: "Cancer ♋", emoji: "♋" },
  { value: "leo", label: "Leo ♌", emoji: "♌" },
  { value: "virgo", label: "Virgo ♍", emoji: "♍" },
  { value: "libra", label: "Libra ♎", emoji: "♎" },
  { value: "scorpio", label: "Scorpio ♏", emoji: "♏" },
  { value: "sagittarius", label: "Sagittarius ♐", emoji: "♐" },
  { value: "capricorn", label: "Capricorn ♑", emoji: "♑" },
  { value: "aquarius", label: "Aquarius ♒", emoji: "♒" },
  { value: "pisces", label: "Pisces ♓", emoji: "♓" },
];

export default function HoroscopeModal({
  isOpen,
  onClose,
  isBlueTheme = false,
}: HoroscopeModalProps) {
  const [selectedSign, setSelectedSign] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [activeTab, setActiveTab] = useState<"daily" | "love">("daily");
  const [refreshKey, setRefreshKey] = useState(0);
  const [displayedDailyReading, setDisplayedDailyReading] =
    useState<string>("");
  const [displayedLoveReading, setDisplayedLoveReading] = useState<string>("");

  const {
    data: horoscope,
    isLoading: isLoadingDaily,
    isFetching: isFetchingDaily,
  } = useGetHoroscope(selectedSign, refreshKey);
  const {
    data: loveHoroscope,
    isLoading: isLoadingLove,
    isFetching: isFetchingLove,
  } = useGetLoveHoroscope(selectedSign, refreshKey);

  // Update displayed readings when new data arrives
  useEffect(() => {
    if (horoscope) {
      setDisplayedDailyReading(horoscope);
    }
  }, [horoscope]);

  useEffect(() => {
    if (loveHoroscope) {
      setDisplayedLoveReading(loveHoroscope);
    }
  }, [loveHoroscope]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedSign("");
      setUserName("");
      setActiveTab("daily");
      setRefreshKey(0);
      setDisplayedDailyReading("");
      setDisplayedLoveReading("");
    }
  }, [isOpen]);

  // Trigger refresh when sign changes to get new randomized content
  useEffect(() => {
    if (selectedSign) {
      setRefreshKey(Date.now());
    }
  }, [selectedSign]);

  const selectedZodiac = zodiacSigns.find(
    (sign) => sign.value === selectedSign,
  );
  const isLoading = activeTab === "daily" ? isLoadingDaily : isLoadingLove;
  const isFetching = activeTab === "daily" ? isFetchingDaily : isFetchingLove;
  const currentReading =
    activeTab === "daily" ? displayedDailyReading : displayedLoveReading;
  const showLoading = (isLoading || isFetching) && !currentReading;

  const personalizeReading = (text: string) => {
    if (!userName.trim()) return text;
    return text
      .replace(/You /g, `${userName}, you `)
      .replace(/Your /g, `${userName}, your `);
  };

  const handleRefresh = () => {
    // Generate new randomized reading
    setRefreshKey(Date.now());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-2xl border-2 backdrop-blur-xl transition-all duration-500 ease-in-out ${
          isBlueTheme
            ? "bg-gradient-to-br from-blue-900/90 via-indigo-800/90 to-blue-900/90 border-blue-400/50"
            : "bg-gradient-to-br from-background via-burnt-orange/10 to-background border-gold/50"
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-3xl font-bold text-center flex items-center justify-center gap-2 transition-colors duration-500 ease-in-out ${
              isBlueTheme ? "text-blue-300" : "text-gold"
            }`}
          >
            <Moon className="w-8 h-8" />
            Horoscope Readings
            <Moon className="w-8 h-8" />
          </DialogTitle>
        </DialogHeader>

        <div className="py-8">
          {/* Zodiac Wheel */}
          <div className="flex justify-center mb-8">
            <img
              src="/assets/generated/zodiac-wheel.dim_400x400.jpg"
              alt="Zodiac Wheel"
              className={`w-40 h-40 object-cover rounded-full border-2 floating-element transition-colors duration-500 ease-in-out ${
                isBlueTheme ? "border-blue-400/50" : "border-gold/50"
              }`}
            />
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <Label
              htmlFor="horoscopeName"
              className={`block text-lg font-semibold mb-3 text-center transition-colors duration-500 ease-in-out ${
                isBlueTheme ? "text-blue-200" : "text-cream"
              }`}
            >
              Your Name (Optional)
            </Label>
            <Input
              id="horoscopeName"
              type="text"
              placeholder="Enter your name for personalized reading..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={`text-lg py-6 rounded-xl transition-all duration-500 ease-in-out ${
                isBlueTheme
                  ? "bg-indigo-900/30 border-2 border-blue-400/40 text-blue-100 placeholder:text-blue-300/50"
                  : "bg-sage/20 border-2 border-gold/40 text-cream placeholder:text-cream/50"
              }`}
            />
          </div>

          {/* Zodiac Sign Selector */}
          <div className="mb-8">
            <Label
              className={`block text-lg font-semibold mb-3 text-center transition-colors duration-500 ease-in-out ${
                isBlueTheme ? "text-blue-200" : "text-cream"
              }`}
            >
              Select Your Zodiac Sign
            </Label>
            <Select value={selectedSign} onValueChange={setSelectedSign}>
              <SelectTrigger
                className={`w-full text-lg py-6 rounded-xl transition-all duration-500 ease-in-out ${
                  isBlueTheme
                    ? "bg-indigo-900/30 border-2 border-blue-400/40 text-blue-100"
                    : "bg-sage/20 border-2 border-gold/40 text-cream"
                }`}
              >
                <SelectValue placeholder="Choose your sign..." />
              </SelectTrigger>
              <SelectContent
                className={`border-2 transition-all duration-500 ease-in-out ${
                  isBlueTheme
                    ? "bg-blue-900/95 border-blue-400/40"
                    : "bg-background border-gold/40"
                }`}
              >
                {zodiacSigns.map((sign) => (
                  <SelectItem
                    key={sign.value}
                    value={sign.value}
                    className={`text-lg py-3 cursor-pointer transition-colors duration-500 ease-in-out ${
                      isBlueTheme
                        ? "text-blue-100 hover:bg-blue-400/20"
                        : "text-cream hover:bg-gold/20"
                    }`}
                  >
                    {sign.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabs for Daily and Love Horoscope */}
          {selectedSign && (
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as "daily" | "love")}
              className="w-full"
            >
              <TabsList
                className={`grid w-full grid-cols-2 border transition-all duration-500 ease-in-out ${
                  isBlueTheme
                    ? "bg-indigo-900/30 border-blue-400/30"
                    : "bg-sage/20 border-gold/30"
                }`}
              >
                <TabsTrigger
                  value="daily"
                  className={`transition-all duration-500 ease-in-out ${
                    isBlueTheme
                      ? "data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                      : "data-[state=active]:bg-burnt-orange data-[state=active]:text-white"
                  }`}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  Daily
                </TabsTrigger>
                <TabsTrigger
                  value="love"
                  className={`transition-all duration-500 ease-in-out ${
                    isBlueTheme
                      ? "data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                      : "data-[state=active]:bg-burnt-orange data-[state=active]:text-white"
                  }`}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Love
                </TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="mt-6">
                {showLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2
                      className={`w-12 h-12 animate-spin mb-4 transition-colors duration-500 ease-in-out ${
                        isBlueTheme ? "text-blue-300" : "text-gold"
                      }`}
                    />
                    <p
                      className={`text-lg transition-colors duration-500 ease-in-out ${
                        isBlueTheme ? "text-blue-200/80" : "text-cream/80"
                      }`}
                    >
                      Reading the stars...
                    </p>
                  </div>
                ) : currentReading ? (
                  <>
                    <div
                      className={`rounded-2xl p-8 border backdrop-blur-sm transition-all duration-500 ease-in-out ${
                        isBlueTheme
                          ? "bg-gradient-to-br from-indigo-600/30 to-blue-700/30 border-blue-400/30"
                          : "bg-gradient-to-br from-burnt-orange/20 to-sage/20 border-gold/30"
                      }`}
                    >
                      <div className="text-center mb-4">
                        <span className="text-6xl">
                          {selectedZodiac?.emoji}
                        </span>
                        <h3
                          className={`text-2xl font-bold mt-2 capitalize transition-colors duration-500 ease-in-out ${
                            isBlueTheme ? "text-blue-300" : "text-gold"
                          }`}
                        >
                          {selectedSign}
                        </h3>
                      </div>
                      <p
                        className={`text-lg leading-relaxed text-center font-medium transition-colors duration-500 ease-in-out ${
                          isBlueTheme ? "text-blue-100" : "text-cream"
                        }`}
                      >
                        {personalizeReading(currentReading)}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Button
                        onClick={handleRefresh}
                        disabled={isFetching}
                        className={`w-full font-bold py-6 text-lg rounded-xl transition-all duration-500 ease-in-out disabled:opacity-50 ${
                          isBlueTheme
                            ? "bg-indigo-600 hover:bg-indigo-600/80 text-white"
                            : "bg-burnt-orange hover:bg-burnt-orange/80 text-white"
                        }`}
                      >
                        {isFetching ? (
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="w-5 h-5 mr-2" />
                        )}
                        New Reading
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p
                      className={`text-lg transition-colors duration-500 ease-in-out ${
                        isBlueTheme ? "text-blue-200/60" : "text-cream/60"
                      }`}
                    >
                      The stars are aligning... Please try again in a moment.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="love" className="mt-6">
                {showLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2
                      className={`w-12 h-12 animate-spin mb-4 transition-colors duration-500 ease-in-out ${
                        isBlueTheme ? "text-blue-300" : "text-gold"
                      }`}
                    />
                    <p
                      className={`text-lg transition-colors duration-500 ease-in-out ${
                        isBlueTheme ? "text-blue-200/80" : "text-cream/80"
                      }`}
                    >
                      Channeling romantic energies...
                    </p>
                  </div>
                ) : currentReading ? (
                  <>
                    <div
                      className={`rounded-2xl p-8 border backdrop-blur-sm transition-all duration-500 ease-in-out ${
                        isBlueTheme
                          ? "bg-gradient-to-br from-indigo-600/30 to-blue-700/30 border-blue-400/30"
                          : "bg-gradient-to-br from-burnt-orange/20 to-sage/20 border-gold/30"
                      }`}
                    >
                      <div className="text-center mb-4">
                        <span className="text-6xl">
                          {selectedZodiac?.emoji}
                        </span>
                        <h3
                          className={`text-2xl font-bold mt-2 capitalize transition-colors duration-500 ease-in-out ${
                            isBlueTheme ? "text-blue-300" : "text-gold"
                          }`}
                        >
                          {selectedSign}
                        </h3>
                      </div>
                      <p
                        className={`text-lg leading-relaxed text-center font-medium transition-colors duration-500 ease-in-out ${
                          isBlueTheme ? "text-blue-100" : "text-cream"
                        }`}
                      >
                        {personalizeReading(currentReading)}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Button
                        onClick={handleRefresh}
                        disabled={isFetching}
                        className={`w-full font-bold py-6 text-lg rounded-xl transition-all duration-500 ease-in-out disabled:opacity-50 ${
                          isBlueTheme
                            ? "bg-indigo-600 hover:bg-indigo-600/80 text-white"
                            : "bg-burnt-orange hover:bg-burnt-orange/80 text-white"
                        }`}
                      >
                        {isFetching ? (
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="w-5 h-5 mr-2" />
                        )}
                        New Reading
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p
                      className={`text-lg transition-colors duration-500 ease-in-out ${
                        isBlueTheme ? "text-blue-200/60" : "text-cream/60"
                      }`}
                    >
                      The stars are aligning... Please try again in a moment.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}

          {/* Close Button */}
          <div className="mt-8">
            <Button
              onClick={onClose}
              variant="outline"
              className={`w-full border-2 font-bold py-6 text-lg rounded-xl transition-all duration-500 ease-in-out ${
                isBlueTheme
                  ? "border-blue-400/50 text-blue-300 hover:bg-blue-400/10"
                  : "border-gold/50 text-gold hover:bg-gold/10"
              }`}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
