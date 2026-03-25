import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetPsychicReading } from "@/hooks/useQueries";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface PsychicReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isBlueTheme?: boolean;
}

export default function PsychicReadingModal({
  isOpen,
  onClose,
  isBlueTheme = false,
}: PsychicReadingModalProps) {
  const [userName, setUserName] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [displayedReading, setDisplayedReading] = useState<string>("");

  const {
    data: reading,
    isLoading,
    isFetching,
  } = useGetPsychicReading(userName || "Seeker", sessionStarted, refreshKey);

  // Update displayed reading when new data arrives
  useEffect(() => {
    if (reading) {
      setDisplayedReading(reading);
    }
  }, [reading]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSessionStarted(false);
      setUserName("");
      setRefreshKey(0);
      setDisplayedReading("");
    }
  }, [isOpen]);

  const handleStartSession = () => {
    setSessionStarted(true);
    // Use a non-zero timestamp to trigger the query immediately
    setRefreshKey(Date.now());
  };

  const handleNewReading = () => {
    // Generate new reading with a new timestamp
    setRefreshKey(Date.now());
  };

  const handleClose = () => {
    setSessionStarted(false);
    setUserName("");
    setRefreshKey(0);
    setDisplayedReading("");
    onClose();
  };

  const showLoading = (isLoading || isFetching) && !displayedReading;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`max-w-2xl border-2 backdrop-blur-xl transition-all duration-500 ease-in-out ${
          isBlueTheme
            ? "bg-gradient-to-br from-blue-900/90 via-indigo-800/90 to-blue-900/90 border-blue-400/50"
            : "bg-gradient-to-br from-background via-sage/10 to-background border-gold/50"
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-3xl font-bold text-center flex items-center justify-center gap-2 transition-colors duration-500 ease-in-out ${
              isBlueTheme ? "text-blue-300" : "text-gold"
            }`}
          >
            <Sparkles className="w-8 h-8" />
            Your Psychic Reading
            <Sparkles className="w-8 h-8" />
          </DialogTitle>
        </DialogHeader>

        <div className="py-8">
          {/* Crystal Ball */}
          <div className="flex justify-center mb-8">
            <img
              src="/assets/generated/crystal-ball-transparent.dim_200x200.png"
              alt="Crystal Ball"
              className="w-40 h-40 object-contain floating-element"
            />
          </div>

          {!sessionStarted ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="userName"
                  className={`text-lg transition-colors duration-500 ease-in-out ${
                    isBlueTheme ? "text-blue-200" : "text-cream"
                  }`}
                >
                  What is your name, seeker? (Optional)
                </Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="Enter your name..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStartSession()}
                  className={`text-lg py-6 rounded-xl transition-all duration-500 ease-in-out ${
                    isBlueTheme
                      ? "bg-indigo-900/30 border-2 border-blue-400/40 text-blue-100 placeholder:text-blue-300/50"
                      : "bg-sage/20 border-2 border-gold/40 text-cream placeholder:text-cream/50"
                  }`}
                />
              </div>
              <Button
                onClick={handleStartSession}
                className={`w-full font-bold py-6 text-lg rounded-xl transition-all duration-500 ease-in-out ${
                  isBlueTheme
                    ? "bg-indigo-600 hover:bg-indigo-600/80 text-white"
                    : "bg-burnt-orange hover:bg-burnt-orange/80 text-white"
                }`}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Session
              </Button>
            </div>
          ) : (
            <>
              {/* Reading Content */}
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
                    Channeling cosmic energies...
                  </p>
                </div>
              ) : (
                <div
                  className={`rounded-2xl p-8 border backdrop-blur-sm transition-all duration-500 ease-in-out ${
                    isBlueTheme
                      ? "bg-gradient-to-br from-indigo-600/30 to-blue-700/30 border-blue-400/30"
                      : "bg-gradient-to-br from-sage/20 to-burnt-orange/20 border-gold/30"
                  }`}
                >
                  <p
                    className={`text-lg leading-relaxed text-center font-medium transition-colors duration-500 ease-in-out ${
                      isBlueTheme ? "text-blue-100" : "text-cream"
                    }`}
                  >
                    {displayedReading ||
                      "The spirits are silent at this moment. Please try again."}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <Button
                  onClick={handleNewReading}
                  disabled={isFetching}
                  className={`flex-1 font-bold py-6 text-lg rounded-xl transition-all duration-500 ease-in-out disabled:opacity-50 ${
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
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className={`flex-1 border-2 font-bold py-6 text-lg rounded-xl transition-all duration-500 ease-in-out ${
                    isBlueTheme
                      ? "border-blue-400/50 text-blue-300 hover:bg-blue-400/10"
                      : "border-gold/50 text-gold hover:bg-gold/10"
                  }`}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
