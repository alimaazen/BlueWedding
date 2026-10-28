import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import blueSealVideo from "@/assets/Blue_Seal_Envelope_White.mp4";
import envelopePoster from "@/assets/envelope_poster.jpg";

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

const Envelope = ({ isOpen, onOpen }: EnvelopeProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoRendering, setIsVideoRendering] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Ensure video is properly muted and prepped on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
    }
  }, []);

  const handleStartPlayback = async () => {
    if (isPlaying || isFinished) return;
    setIsPlaying(true);

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      try {
        await videoRef.current.play();
      } catch (err) {
        console.warn("Playback error:", err);
      }
    }
  };

  const triggerReveal = () => {
    if (isFadingOut || isFinished) return;
    setIsFadingOut(true);

    // Call onOpen to trigger identical 4.5s fade-in for both Bismillah & 3D corner borders
    onOpen();

    // Unmount after 4.5s fade out completes
    setTimeout(() => {
      setIsFinished(true);
    }, 4500);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;

    // Mobile fix: Only hide the poster once video has actively decoded and rendered past frame 0
    if (currentTime > 0.06 && !isVideoRendering) {
      setIsVideoRendering(true);
    }

    if (duration > 0 && currentTime >= duration - 0.25) {
      triggerReveal();
    }
  };

  const handleVideoEnded = () => {
    triggerReveal();
  };

  if (isFinished || isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-y-0 z-[100] overflow-hidden max-w-[430px] w-full left-1/2 -translate-x-1/2 bg-white flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={isFadingOut ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
        >
          {/* Main Reveal Video */}
          <video
            ref={videoRef}
            src={blueSealVideo}
            poster={envelopePoster}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover select-none pointer-events-none"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
          />

          {/* Seamless Poster Overlay: Guaranteed to stay visible until video has actively advanced frames on mobile */}
          <img
            src={envelopePoster}
            alt="Envelope Seal"
            className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-opacity duration-200 ${
              isVideoRendering ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Initial Interactive Overlay to tap the seal and start playback */}
          {!isPlaying && (
            <div
              className="absolute inset-0 z-10 cursor-pointer select-none pointer-events-auto"
              onClick={handleStartPlayback}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Envelope;