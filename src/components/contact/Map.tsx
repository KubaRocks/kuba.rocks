import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { mapConfig } from "@app/components/contact/mapConfig";
import { env } from "@app/env/client.mjs";

const MapStyled = styled.div`
  margin-bottom: 4rem;
  margin-left: -2rem;
  margin-right: -2rem;
  height: 54rem;
  @media (max-width: 768px) {
    height: 25rem;
  }
`;

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
