import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Heart, Loader2 } from "lucide-react";

const RSVPForm = () => {
  const [attendance, setAttendance] = useState<"attending" | "declining" | null>(null);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;

    setIsSubmitting(true);

    try {
      // Using Web3Forms for Vercel static deployment
      // Get your free access key at https://web3forms.com registered to zuhairuf@gmail.com
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Wedding RSVP from ${name}`,
          from_name: "Wedding Invitation Site",
          name: name,
          attendance: attendance === "attending" ? "Attending, In Sha Allah" : "Regretfully Declining",
          total_guests: attendance === "attending" ? guestCount + 1 : 0,
          message: note || "No additional note provided.",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        console.error("Web3Forms error:", result);
        alert(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`w-full max-w-sm mx-auto rounded-2xl bg-white/90 backdrop-blur-md border border-[#5D6D7E]/25 shadow-lg text-[#2C3E50] transition-all duration-300 ${
        attendance ? "p-5 sm:p-6" : "px-4 py-3 sm:px-5 sm:py-3.5"
      }`}
    >
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2.5">
              <Checkbox
                id="attending"
                checked={attendance === "attending"}
                onCheckedChange={(checked) => {
                  if (checked) setAttendance("attending");
                  else setAttendance(null);
                }}
                className="border-[#5D6D7E] data-[state=checked]:bg-[#2C3E50] data-[state=checked]:text-white h-4 w-4 sm:h-5 sm:w-5 rounded-md shrink-0 cursor-pointer"
              />
              <Label
                htmlFor="attending"
                className="text-[13px] min-[360px]:text-[14px] sm:text-base font-semibold text-[#2C3E50] cursor-pointer tracking-wide select-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Yes, I'll be there, In Sha Allah
              </Label>
            </div>

            <div className="flex items-center space-x-2.5">
              <Checkbox
                id="declining"
                checked={attendance === "declining"}
                onCheckedChange={(checked) => {
                  if (checked) setAttendance("declining");
                  else setAttendance(null);
                }}
                className="border-[#5D6D7E] data-[state=checked]:bg-red-800 data-[state=checked]:text-white h-4 w-4 sm:h-5 sm:w-5 rounded-md shrink-0 cursor-pointer"
              />
              <Label
                htmlFor="declining"
                className="text-[13px] min-[360px]:text-[14px] sm:text-base font-semibold text-[#2C3E50]/70 cursor-pointer tracking-wide select-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Regretfully Declining
              </Label>
            </div>
          </div>

          <AnimatePresence>
            {attendance && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-4 pt-4 mt-4 border-t border-[#5D6D7E]/15"
              >
                <div>
                  <Label htmlFor="name" className="text-xs uppercase tracking-widest text-[#5D6D7E] font-semibold mb-1.5 block">
                    Your full name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="bg-[#FAF7F2]/90 border-[#5D6D7E]/25 text-[#2C3E50] placeholder:text-[#2C3E50]/40 focus-visible:ring-[#2C3E50] text-sm h-11 rounded-xl"
                  />
                </div>

                {attendance === "attending" && (
                  <div>
                    <Label className="text-xs uppercase tracking-widest text-[#5D6D7E] font-semibold mb-1.5 block">
                      Additional family members joining
                    </Label>
                    <div className="flex items-center space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setGuestCount((prev) => Math.max(0, prev - 1))}
                        className="border-[#5D6D7E]/25 bg-[#FAF7F2]/90 text-[#2C3E50] hover:bg-[#5D6D7E]/10 h-10 w-10 rounded-xl"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </Button>
                      <div className="flex-1 text-center font-heading font-semibold text-lg border border-[#5D6D7E]/25 bg-[#FAF7F2]/90 rounded-xl py-1.5 text-[#2C3E50]">
                        {guestCount}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setGuestCount((prev) => prev + 1)}
                        className="border-[#5D6D7E]/25 bg-[#FAF7F2]/90 text-[#2C3E50] hover:bg-[#5D6D7E]/10 h-10 w-10 rounded-xl"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="note" className="text-xs uppercase tracking-widest text-[#5D6D7E] font-semibold mb-1.5 block">
                    {attendance === "attending" ? "A personal note or duas (optional)" : "A message for the couple (optional)"}
                  </Label>
                  <Textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Share your warm wishes..."
                    className="bg-[#FAF7F2]/90 border-[#5D6D7E]/25 text-[#2C3E50] placeholder:text-[#2C3E50]/40 focus-visible:ring-[#2C3E50] text-sm resize-none h-24 rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2C3E50] hover:bg-[#1B2838] text-white font-heading font-semibold uppercase tracking-widest h-12 rounded-xl shadow-lg transition-all"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Confirm Attendance"
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6 space-y-3"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-[#2C3E50]/10 flex items-center justify-center text-[#2C3E50]">
            <Heart className="w-6 h-6 fill-[#2C3E50]" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-[#2C3E50]">JazakAllahu Khayran!</h3>
          <p className="text-sm text-[#5D6D7E] italic">
            Thank you, {name}. Your RSVP has been graciously received.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default RSVPForm;
