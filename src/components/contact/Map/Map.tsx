import GoogleMapReact from "google-map-react";
import { env } from "@app/env/client.mjs";
import { MapStyled } from "./styles";
import { mapConfig } from "./mapConfig";

export const Map = () => {
  return (
    <MapStyled>
      <GoogleMapReact
        bootstrapURLKeys={{ key: env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }}
        defaultCenter={{ lat: 52.143945434324685, lng: 21.066256059149083 }}
        defaultZoom={14}
        options={mapConfig}
      />
    </MapStyled>
  );
};
