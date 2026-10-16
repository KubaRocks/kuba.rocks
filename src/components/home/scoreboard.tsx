"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Lit segments for digits 0–9 (standard a–g seven-segment layout)
const SEGMENTS = [
  "abcdef",
  "bc",
  "abdeg",
  "abcdg",
  "bcfg",
  "acdfg",
  "acdefg",
  "abc",
  "abcdefg",
  "abcdfg",
];
const DURATION_MS = 2000;
const STAGGER_MS = 160;
// The count-up starts once the board's top edge enters the upper 75% of the
// viewport. Viewport-relative, so it works however tall the board or screen is.
const PLAY_ZONE = "0px 0px -25% 0px";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function Digits({ value, length }: { value: number; length: number }) {
  const str = String(value);
  const offset = length - str.length;

  return (
    <div className="led" aria-hidden="true">
      {Array.from({ length }, (_, i) => {
        const char = i >= offset ? str[i - offset] : null;
        const lit = char === null ? "" : SEGMENTS[Number(char)];
        return (
          <span key={i} className="led-digit">
            {"abcdefg".split("").map((seg) => (
              <i
                key={seg}
                className={`seg seg-${seg}`}
                data-on={lit.includes(seg)}
              />
            ))}
          </span>
        );
      })}
    </div>
  );
}

interface ScoreboardProps {
  years: number;
  hours: number;
  coffee: number;
  repos: number;
  season: number;
}

export function Scoreboard({
  years,
  hours,
  coffee,
  repos,
  season,
}: ScoreboardProps) {
  // The server snapshot reports reduced motion, so pre-rendered HTML shows final values.
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true
  );
  // Armed when the user starts scrolling while the board is out of view; only then
  // does it count up from 0. Otherwise the final values simply stay put.
  const [armed, setArmed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const panels = [
    {
      key: "years",
      label: "Seasons",
      note: "Since 2004",
      target: years,
      plus: true,
      srText: `${years}+ years of commercial experience`,
      className:
        "[grid-area:home] [--s:clamp(3rem,5vw,5rem)] max-sm:[--s:2.6rem]",
    },
    {
      key: "hours",
      label: "Hours played",
      note: "Working hours on the clock",
      target: hours,
      plus: true,
      srText: `${hours.toLocaleString("en-US")}+ working hours`,
      className:
        "[grid-area:clock] [--s:clamp(3.4rem,6.6vw,6.6rem)] max-sm:[--s:3.1rem]",
    },
    {
      key: "coffee",
      label: "Coffees",
      note: "Way too many",
      target: coffee,
      plus: true,
      srText: `${coffee.toLocaleString("en-US")}+ coffees`,
      className:
        "[grid-area:guest] [--s:clamp(3rem,5vw,5rem)] max-sm:[--s:2.6rem]",
    },
    {
      key: "repos",
      label: "GitHub repos",
      note: null,
      target: repos,
      plus: false,
      srText: `${repos} GitHub repositories`,
      className: "[grid-area:shot] [--s:clamp(2.4rem,3.4vw,3.4rem)]",
    },
  ];
  const totalMs = DURATION_MS + STAGGER_MS * (panels.length - 1);

  useEffect(() => {
    if (reducedMotion) return;
    const board = boardRef.current;
    if (!board) return;

    let frame = 0;
    let isArmed = false;
    let inPlay = false;

    const startCountUp = () => {
      const start = performance.now();
      const tick = (now: number) => {
        setElapsed(now - start);
        if (now - start < totalMs) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // Arm only on real user input while the board is out of play. Scroll
    // restoration on reload fires none of these, so a restored board keeps
    // its final values instead of snapping to 0.
    const userEvents = ["wheel", "touchstart", "keydown", "pointerdown"];
    const arm = () => {
      if (inPlay || isArmed) return;
      isArmed = true;
      setArmed(true);
    };
    const stopListening = () =>
      userEvents.forEach((type) => window.removeEventListener(type, arm));

    const observer = new IntersectionObserver(
      (entries) => {
        inPlay = entries[entries.length - 1].isIntersecting;
        if (!inPlay) return;
        observer.disconnect();
        stopListening();
        if (isArmed) startCountUp();
        else setArmed(false); // in play without being armed: keep final values
      },
      { rootMargin: PLAY_ZONE }
    );

    userEvents.forEach((type) =>
      window.addEventListener(type, arm, { passive: true })
    );
    observer.observe(board);

    return () => {
      stopListening();
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion, totalMs]);

  return (
    <div ref={boardRef} className="scoreboard">
      <div className="mb-[clamp(18px,3vw,28px)] flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-amber/25 pb-4 font-display text-[clamp(16px,2vw,22px)] font-extrabold uppercase leading-none tracking-[0.24em]">
        <span>Kuba.Rocks Arena</span>
        <span className="live-dot flex items-center font-mono text-[11px] font-medium tracking-[0.2em] text-amber">
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 items-center gap-x-[clamp(16px,3vw,40px)] gap-y-[clamp(16px,2.6vw,32px)] [grid-template-areas:'clock_clock''home_home''guest_guest''shot_shot''left_right'] sm:[grid-template-areas:'clock_clock''home_guest''shot_shot''left_right'] lg:grid-cols-[1fr_1.5fr_1fr] lg:[grid-template-areas:'home_clock_guest''left_shot_right']">
        {panels.map((panel, i) => {
          const progress = Math.min(
            1,
            Math.max(0, (elapsed - i * STAGGER_MS) / DURATION_MS)
          );
          const value =
            reducedMotion || !armed
              ? panel.target
              : Math.round(panel.target * easeOutQuart(progress));

          return (
            <div
              key={panel.key}
              className={`flex flex-col items-center gap-3 text-center ${panel.className}`}
            >
              <span className="font-display text-[clamp(15px,1.7vw,21px)] font-extrabold uppercase leading-none tracking-[0.22em]">
                {panel.label}
              </span>
              <div className="led-cell">
                <Digits value={value} length={String(panel.target).length} />
                {panel.plus && (
                  <span className="led-plus" aria-hidden="true">
                    +
                  </span>
                )}
              </div>
              {panel.note && (
                <span className="font-mono text-[11px] uppercase leading-[1.3] tracking-[0.14em] text-chalk-faint">
                  {panel.note}
                </span>
              )}
              <span className="sr-only">{panel.srText}</span>
            </div>
          );
        })}
        <p
          aria-hidden="true"
          className="font-mono text-xs uppercase leading-normal tracking-[0.14em] text-chalk-faint [grid-area:left] max-sm:text-[10px]"
        >
          <b className="block font-bold text-orange">Home</b>Warsaw, PL
        </p>
        <p
          aria-hidden="true"
          className="text-right font-mono text-xs uppercase leading-normal tracking-[0.14em] text-chalk-faint [grid-area:right] max-sm:text-[10px]"
        >
          <b className="block font-bold text-orange">Season</b>
          {season}
        </p>
      </div>
    </div>
  );
}
