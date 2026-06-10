import { useEffect, useState } from "react";

const LOGO_TEXT = "LONG THỊNH";

export function LogoSplash({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);
  const letters = LOGO_TEXT.split("");

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1800);
    const doneTimer = setTimeout(onComplete, 2400);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={exiting}
    >
      <div className="flex items-center justify-center px-6">
        {letters.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="logo-letter-pop inline-block text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-600 tracking-tight"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div className="mt-8 h-1 w-32 rounded-full bg-gray-100 overflow-hidden">
        <div className="logo-loading-bar h-full bg-orange-500 rounded-full" />
      </div>
    </div>
  );
}
