import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollInvitation from "@/components/ScrollInvitation";
import CountdownTimer from "@/components/CountdownTimer";
import Envelope from "@/components/Envelope";
import ScrollSection from "@/components/ScrollSection";
import bluePaperBackground from "@/assets/bluePaperBackground.png";
import floralBorderOverlay from "@/assets/floral_border_overlay.png";
import thanksFlowers from "@/assets/thanks flowers.png";
import newBlueThanks from "@/assets/newBlueThanks.png";
import FallingPetals from "@/components/FallingPetals";
import RSVPForm from "@/components/RSVPForm";

const Index = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const isBottom = container.clientHeight + container.scrollTop >= container.scrollHeight - 150;
      setIsAtBottom(isBottom);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }
    
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isEnvelopeOpen]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="h-[100svh] w-full overflow-hidden relative bg-[#F5F2EC] flex justify-center">
      <div className="hidden min-[480px]:flex fixed inset-0 bg-[#F5F2EC]/95 backdrop-blur-3xl z-[100] flex-col items-center justify-center p-6 text-center text-[#2C3E50]">
        <div className="max-w-[340px] w-full border border-[#5D6D7E]/20 rounded-3xl p-8 bg-white/50 backdrop-blur-md shadow-[0_0_50px_rgba(44,62,80,0.05)] flex flex-col items-center gap-6">
            <p className="font-heading">Please view on mobile.</p>
        </div>
      </div>

      <div 
        className="relative z-10 w-full max-w-[430px] h-[100svh] max-h-[100svh] shadow-2xl overflow-hidden flex flex-col bg-white"
      >
        {/* Background Layer: Blue Paper Parchment Background fades in simultaneously */}
        {isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0 pointer-events-none select-none"
            style={{
              backgroundImage: `url(${bluePaperBackground})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center"
            }}
          />
        )}

        <div
          ref={scrollContainerRef}
          className={`relative z-10 w-full h-full flex flex-col ${
            !isEnvelopeOpen ? "overflow-y-hidden" : "overflow-y-auto"
          } overflow-x-hidden`}
        >
          {isEnvelopeOpen && <FallingPetals />}
          <Envelope isOpen={isEnvelopeOpen} onOpen={() => setIsEnvelopeOpen(true)} />

          {isEnvelopeOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 4.5, ease: "easeInOut" }}
              className="relative z-20 flex-1 flex flex-col"
            >
              <ScrollInvitation />

              {/* Countdown timer */}
              <ScrollSection>
                <div className="flex flex-col items-center text-center">
                  <motion.h2
                    className="text-[#5D6D7E] font-heading text-sm sm:text-base md:text-lg font-bold tracking-[0.22em] mb-7 uppercase"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    UNTIL THE DAY
                  </motion.h2>
                  <CountdownTimer />
                  <motion.p
                    className="mt-16 text-4xl md:text-5xl text-[#2C3E50] drop-shadow-sm"
                    style={{ fontFamily: "'Aref Ruqaa', serif", fontWeight: 700 }}
                    dir="rtl"
                    lang="ar"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1 }}
                  >
                    إِنْ شَاءَ اللَّه
                  </motion.p>
                </div>
              </ScrollSection>

              {/* Closing Section: Bouquet & Thanks together in full view */}
              <ScrollSection>
                <div className="flex flex-col items-center text-center py-6">
                  <motion.img
                    src={thanksFlowers}
                    alt="Flowers Bouquet"
                    className="w-36 min-[360px]:w-40 md:w-48 max-w-full drop-shadow-md select-none"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <div className="flex flex-col items-center mt-4">
                    <motion.img
                      src={newBlueThanks}
                      alt="Presence brings us joy and happiness"
                      className="w-56 min-[360px]:w-60 md:w-72 max-w-full drop-shadow-sm select-none"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    />
                    <motion.p
                      className="text-center text-[11px] min-[360px]:text-xs text-[#2C3E50] font-body italic max-w-xs px-2 mt-1 leading-snug font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.35 }}
                    >
                      Your presence gives us joy and happiness
                    </motion.p>
                  </div>
                </div>
              </ScrollSection>

              {/* RSVP Section: Seamless natural section on the floral parchment background */}
              <ScrollSection>
                <div className="w-full max-w-md px-3 py-6 flex flex-col items-center text-center">
                  <motion.h2
                    className="text-[#5D6D7E] font-heading text-sm sm:text-base md:text-lg font-bold tracking-[0.22em] mb-6 uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    RSVP
                  </motion.h2>

                  <div className="w-full max-w-sm">
                    <RSVPForm />
                  </div>
                </div>
              </ScrollSection>
            </motion.div>
          )}
        </div>

        {/* 3D Foreground Layer: Corner flowers and borders sit in front of scrolling text once invitation opens */}
        {isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
            className="absolute inset-0 z-30 pointer-events-none select-none"
            style={{ willChange: "opacity" }}
          >
            <img
              src={floralBorderOverlay}
              alt=""
              className="w-full h-full object-fill drop-shadow-[0_4px_12px_rgba(44,62,80,0.18)]"
            />
          </motion.div>
        )}
      </div>

      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 pointer-events-none max-w-[430px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isEnvelopeOpen && !isAtBottom ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <span className="text-[#5A3322] text-[10px] md:text-xs font-heading font-bold tracking-[0.22em] uppercase px-3 py-1 rounded-full bg-white/70 backdrop-blur-md shadow-sm border border-[#5A3322]/15">
          Please Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#5A3322]" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
