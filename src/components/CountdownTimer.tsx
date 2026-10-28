import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ScratchTileProps {
  label: string;
  value: number;
  onScratchedOnce: () => void;
  index: number;
}

const ScratchTile = ({ label, value, onScratchedOnce, index }: ScratchTileProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredTouchRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 76;
    const height = rect.height || 82;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Clean, elegant soft-slate blue scratch coating (delicate and distinct from the white revealed card)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#536B82");
    gradient.addColorStop(0.3, "#41576D");
    gradient.addColorStop(0.7, "#35485B");
    gradient.addColorStop(1, "#283747");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle luxury shimmer texture lines
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    for (let i = 0; i < width; i += 4) {
      ctx.fillRect(i, 0, 1.2, height);
    }
    for (let j = 0; j < height; j += 4) {
      ctx.fillRect(0, j, width, 1);
    }

    // Border bevel
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(1, 1, width - 2, height - 2);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    // Wider scratch radius (18px) for effortless, clean, generous revealing
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    // If moving continuously, interpolate stroke between points for seamless clearing
    if (lastPosRef.current) {
      ctx.beginPath();
      ctx.lineWidth = 36;
      ctx.lineCap = "round";
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    lastPosRef.current = { x, y };

    if (!hasTriggeredTouchRef.current) {
      hasTriggeredTouchRef.current = true;
      onScratchedOnce();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawingRef.current = true;
    const touch = e.touches[0];
    lastPosRef.current = null;
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawingRef.current = true;
    lastPosRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  return (
    <motion.div
      className="text-center flex flex-col items-center select-none"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
    >
      <div
        ref={containerRef}
        className="relative w-[70px] min-[360px]:w-[74px] md:w-[84px] h-[78px] min-[360px]:h-[82px] md:h-[92px] rounded-xl overflow-hidden shadow-2xl border border-[#5D6D7E]/30 flex items-center justify-center cursor-pointer group touch-none select-none"
        title="Scratch to reveal"
      >
        {/* Underneath: Revealed Live Counting Value with luminous, crisp high-contrast background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#F0EDE6] flex flex-col items-center justify-center p-2 z-0">
          <motion.span
            key={value}
            className="text-2xl min-[360px]:text-3xl md:text-4xl text-[#1B365D] font-bold drop-shadow-sm"
            style={{ fontFamily: "'Cinzel', serif", fontWeight: 700 }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
          <div className="w-7 h-[1.5px] bg-[#1B365D]/40 mt-1" />
        </div>

        {/* Scratch Canvas Overlay */}
        <div className="absolute inset-0 z-10">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-pointer touch-none block"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>

      {/* Block Label */}
      <p
        className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#5D6D7E] font-bold mt-2.5 transition-colors"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {label}
      </p>
    </motion.div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [touchedTiles, setTouchedTiles] = useState<Record<string, boolean>>({
    Days: false,
    Hours: false,
    Minutes: false,
    Seconds: false,
  });

  const confettiTriggeredRef = useRef(false);

  useEffect(() => {
    const weddingDate = new Date("2026-11-27T18:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerCelebrationConfetti = () => {
    const colors = ["#2C3E50", "#5D6D7E", "#85929E", "#5A3322", "#D4AF37", "#FFFFFF"];

    confetti({
      particleCount: 55,
      spread: 60,
      origin: { y: 0.65 },
      colors,
      disableForReducedMotion: true,
    });
  };

  const handleTileTouched = (label: string) => {
    setTouchedTiles((prev) => {
      const updated = {
        ...prev,
        [label]: true,
      };
      const allTouched = Object.values(updated).every(Boolean);
      if (allTouched && !confettiTriggeredRef.current) {
        confettiTriggeredRef.current = true;
        triggerCelebrationConfetti();
      }
      return updated;
    });
  };

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-4 text-[#5D6D7E] text-xs tracking-wider uppercase font-heading font-semibold"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#5D6D7E] animate-pulse" />
        <span>Scratch each tile to reveal</span>
        <Sparkles className="w-3.5 h-3.5 text-[#5D6D7E] animate-pulse" />
      </motion.div>

      <motion.div
        className="flex justify-center gap-2 min-[360px]:gap-2.5 md:gap-3.5 px-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {timeBlocks.map((block, index) => (
          <ScratchTile
            key={block.label}
            label={block.label}
            value={block.value}
            onScratchedOnce={() => handleTileTouched(block.label)}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CountdownTimer;
