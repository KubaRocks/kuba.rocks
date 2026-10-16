"use client";

import { useState } from "react";
import Image from "next/image";

interface TradingCardProps {
  jersey: number;
  years: number;
  teams: number;
  repos: number;
  coffee: number;
  currentTeam: string;
  signatureMove: string;
}

/**
 * Flips to the goofy photo on hover (pointer devices), on keyboard focus,
 * and on click/tap or Enter/Space.
 */
export function TradingCard({
  jersey,
  years,
  teams,
  repos,
  coffee,
  currentTeam,
  signatureMove,
}: TradingCardProps) {
  const [flipped, setFlipped] = useState(false);
  const cups = `${Math.floor(coffee / 100) / 10}K`;

  return (
    <div
      tabIndex={0}
      role="group"
      aria-roledescription="trading card"
      aria-label="Kuba Florczuk trading card"
      data-flipped={flipped}
      className="trading-card"
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      onMouseLeave={() => setFlipped(false)}
      onBlur={() => setFlipped(false)}
    >
      <div className="trading-card-inner">
        {/* Front */}
        <div className="card-face card-front">
          <div className="relative aspect-square overflow-hidden border-[3px] border-chalk bg-[#6F7F92]">
            <Image
              src="/images/me-normal.png"
              width={800}
              height={800}
              sizes="340px"
              loading="eager"
              alt="Kuba Florczuk looking up, calm, on a blue-grey studio backdrop"
              className="h-full w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute left-2 top-2 grid h-[46px] w-[46px] place-items-center rounded-full border-2 border-chalk bg-deep font-display text-2xl font-black leading-none"
            >
              {jersey}
            </span>
            <span className="clip-tag absolute right-0 top-2.5 bg-chalk py-1.5 pl-2.5 pr-2 font-mono text-[11px] font-bold uppercase leading-none tracking-[0.14em] text-deep">
              {currentTeam}
            </span>
          </div>
          <div className="clip-corner relative flex flex-1 flex-col justify-center bg-deep px-3.5 py-1.5">
            <span className="absolute right-3 top-2 font-mono text-[10px] leading-none tracking-[0.1em] text-amber">
              EST. 2004
            </span>
            <span className="font-display text-[clamp(26px,2.6vw,34px)] font-black uppercase leading-[0.9] tracking-[0.02em]">
              Kuba <span className="text-orange">Florczuk</span>
            </span>
            <span className="mt-1.5 font-cond text-[13px] font-semibold uppercase leading-tight tracking-[0.16em] text-chalk-muted">
              Full-Stack · Team Lead
            </span>
          </div>
        </div>

        {/* Back */}
        <div className="card-face card-back">
          <div className="flex items-baseline justify-between bg-orange px-2.5 py-1.5 font-display text-lg font-black uppercase leading-none tracking-[0.04em] text-deep">
            No. {jersey} Florczuk
            <small className="font-mono text-[10px] font-bold tracking-[0.08em]">
              CARD {jersey}/{jersey}
            </small>
          </div>
          <div className="grid grid-cols-[54%_1fr] gap-2.5 p-2.5">
            <Image
              src="/images/me-hover.png"
              width={800}
              height={800}
              sizes="180px"
              alt="Kuba Florczuk pulling a goofy grimace"
              className="aspect-square w-full self-start border-2 border-chalk bg-[#6F7F92] object-cover"
            />
            <dl className="grid content-start gap-[3px]">
              {[
                ["Pos", "Full-Stack / Lead"],
                ["Team", currentTeam],
                ["From", "Warsaw, PL"],
                ["Rookie", "2004, Stalgast"],
              ].map(([term, value]) => (
                <div key={term} className="flex flex-col">
                  <dt className="font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-amber">
                    {term}
                  </dt>
                  <dd className="font-cond text-[13px] font-semibold uppercase leading-[1.15] tracking-[0.04em]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <table className="mx-2.5 border-y-2 border-chalk text-center font-mono text-[10px]">
            <caption className="sr-only">Career stat line</caption>
            <thead>
              <tr className="text-amber">
                <td className="border-b border-line" />
                <th scope="col" className="border-b border-line px-0.5 py-1 font-normal tracking-[0.06em]">SZN</th>
                <th scope="col" className="border-b border-line px-0.5 py-1 font-normal tracking-[0.06em]">TMS</th>
                <th scope="col" className="border-b border-line px-0.5 py-1 font-normal tracking-[0.06em]">REPO</th>
                <th scope="col" className="border-b border-line px-0.5 py-1 font-normal tracking-[0.06em]">CUPS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs font-bold">
                <th scope="row" className="py-1 text-left text-[10px] font-normal">CAREER</th>
                <td className="px-0.5 py-1">{years}</td>
                <td className="px-0.5 py-1">{teams}</td>
                <td className="px-0.5 py-1">{repos}</td>
                <td className="px-0.5 py-1">{cups}</td>
              </tr>
            </tbody>
          </table>
          <p className="mx-2.5 mt-2.5 font-cond text-[15px] font-semibold uppercase leading-[1.2] tracking-[0.03em]">
            <span className="mb-[3px] block font-mono text-[9px] font-medium leading-tight tracking-[0.12em] text-amber">
              Signature move
            </span>
            {signatureMove}
          </p>
          <p className="mx-2.5 mb-2.5 mt-auto border-l-[3px] border-orange bg-chalk/6 px-2.5 py-2 text-[11.5px] text-chalk-muted">
            <b className="mb-0.5 block font-display text-[13px] font-extrabold uppercase leading-[1.2] tracking-[0.08em] text-chalk">
              Did you know?
            </b>
            In high school his Connect Four bot played a double-elimination
            tournament against the rest of the class.
          </p>
        </div>
      </div>
    </div>
  );
}
