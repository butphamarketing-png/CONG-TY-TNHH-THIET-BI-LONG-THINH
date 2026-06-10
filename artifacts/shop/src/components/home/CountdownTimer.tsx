import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function getEndOfDay(): Date {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end;
}

function getTimeLeft(end: Date) {
  const diff = Math.max(0, end.getTime() - Date.now());
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function CountdownTimer() {
  const [end] = useState(getEndOfDay);
  const [time, setTime] = useState(getTimeLeft(end));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(end)), 1000);
    return () => clearInterval(id);
  }, [end]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2 text-white">
      <Clock className="w-4 h-4 shrink-0 opacity-90" />
      <div className="flex items-center gap-1 text-sm font-semibold">
        <span className="bg-black/25 backdrop-blur-sm px-2 py-1 rounded-lg tabular-nums">
          {pad(time.hours)}
        </span>
        <span>:</span>
        <span className="bg-black/25 backdrop-blur-sm px-2 py-1 rounded-lg tabular-nums">
          {pad(time.minutes)}
        </span>
        <span>:</span>
        <span className="bg-black/25 backdrop-blur-sm px-2 py-1 rounded-lg tabular-nums">
          {pad(time.seconds)}
        </span>
      </div>
    </div>
  );
}
