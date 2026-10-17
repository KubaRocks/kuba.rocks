import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { JERSEY_NUMBER } from "@/lib/jersey";
import { PERSON, SITE_NAME } from "@/lib/site";

export const alt = `${PERSON.name}, ${PERSON.jobTitle}, No. ${JERSEY_NUMBER}, ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Night palette from globals.css; share previews have no light mode
const NAVY = "#0E1B2C";
const DEEP = "#08111D";
const ORANGE = "#F26B1D";
const AMBER = "#FFB000";
const CHALK = "#F4F1EA";
const CHALK_MUTED = "rgba(244, 241, 234, 0.74)";
const LINE = "rgba(244, 241, 234, 0.12)";

const fontsDir = join(process.cwd(), "src/app/fonts");

export default async function Image() {
  const [display, condensed, photo] = await Promise.all([
    readFile(join(fontsDir, "big-shoulders-black.ttf")),
    readFile(join(fontsDir, "barlow-condensed-semibold.ttf")),
    readFile(join(process.cwd(), "public", PERSON.photo)),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  const label = {
    fontFamily: "Barlow Condensed",
    textTransform: "uppercase",
    letterSpacing: "0.16em",
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: CHALK,
          backgroundColor: NAVY,
          backgroundImage: `radial-gradient(circle at 78% 45%, rgba(242, 107, 29, 0.22), transparent 55%), radial-gradient(circle at 0% 100%, ${DEEP}, transparent 60%)`,
        }}
      >
        {/* Center circle and half-court line */}
        <div
          style={{
            position: "absolute",
            left: 640,
            top: -260,
            width: 760,
            height: 760,
            borderRadius: "50%",
            border: `3px solid ${LINE}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 1020,
            top: 0,
            width: 3,
            height: 630,
            backgroundColor: LINE,
          }}
        />
        <div
          style={{
            position: "absolute",
            display: "flex",
            right: -30,
            bottom: -150,
            fontFamily: "Big Shoulders",
            fontSize: 620,
            lineHeight: 1,
            color: "rgba(244, 241, 234, 0.05)",
          }}
        >
          {JERSEY_NUMBER}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0 0 72px",
            width: 760,
          }}
        >
          <div style={{ ...label, display: "flex", fontSize: 26, color: ORANGE }}>
            {`Player profile · No. ${JERSEY_NUMBER} · Warsaw`}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontFamily: "Big Shoulders",
              textTransform: "uppercase",
              lineHeight: 0.82,
            }}
          >
            <span style={{ fontSize: 92, letterSpacing: "0.04em", color: ORANGE }}>
              Kuba
            </span>
            <span style={{ fontSize: 176, marginLeft: -5 }}>Florczuk</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontFamily: "Barlow Condensed",
              fontSize: 40,
              color: CHALK_MUTED,
            }}
          >
            {PERSON.jobTitle}
          </div>
          <div
            style={{
              ...label,
              display: "flex",
              marginTop: 56,
              fontSize: 26,
              color: AMBER,
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        {/* Trading card */}
        <div
          style={{
            position: "absolute",
            left: 838,
            top: 78,
            display: "flex",
            flexDirection: "column",
            width: 310,
            padding: 14,
            backgroundColor: DEEP,
            border: `3px solid ${CHALK}`,
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.45)",
            transform: "rotate(4deg)",
          }}
        >
          <img
            src={photoSrc}
            width={276}
            height={276}
            alt=""
            style={{ border: `3px solid ${CHALK}` }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 14,
              padding: "10px 14px",
              backgroundColor: ORANGE,
              color: DEEP,
            }}
          >
            <span style={{ ...label, fontSize: 22, letterSpacing: "0.1em" }}>
              Full-Stack · Lead
            </span>
            <span style={{ fontFamily: "Big Shoulders", fontSize: 40, lineHeight: 1 }}>
              {JERSEY_NUMBER}
            </span>
          </div>
          <div
            style={{
              ...label,
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
              fontSize: 20,
              color: CHALK_MUTED,
            }}
          >
            <span>Rookie 2004</span>
            <span>Warsaw, PL</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Big Shoulders", data: display, weight: 900, style: "normal" },
        { name: "Barlow Condensed", data: condensed, weight: 600, style: "normal" },
      ],
    }
  );
}
