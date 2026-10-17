"use client";

import GoogleMapReact from "google-map-react";
import { useResolvedTheme } from "@/lib/use-theme";

// Night game: arena navy geometry, faint chalk labels, orange highways.
const nightMap = {
  styles: [
    { elementType: "geometry", stylers: [{ color: "#0E1B2C" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8A93A0" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#08111D" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#24344A" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#132438" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#10233A" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#1A2C44" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#22364F" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#F26B1D" }, { lightness: -35 }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#132438" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#08111D" }],
    },
  ],
};

// Day game: paper geometry, ink labels, white streets, pale orange highways.
const dayMap = {
  styles: [
    { elementType: "geometry", stylers: [{ color: "#ECE6DB" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#5A6472" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#F3EFE7" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#C9BFAE" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#E3DCCF" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#DDDDC8" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#F8F4EC" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#FFFDF8" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#F5B48A" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#E3DCCF" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#C9D3D9" }],
    },
  ],
};

export function ContactMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  // Restyles the live map when the theme or the OS setting changes
  const theme = useResolvedTheme();

  if (!apiKey) return null;

  return (
    <div className="h-[20rem] w-full border-y-2 border-orange md:h-[28rem]">
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: 52.143945434324685, lng: 21.066256059149083 }}
        defaultZoom={14}
        options={theme === "light" ? dayMap : nightMap}
      />
    </div>
  );
}
