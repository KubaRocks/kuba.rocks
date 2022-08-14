import React from "react";
import { inferQueryOutput } from "@app/utils/trpc";
import { SectionTitle } from "@app/components/common/SectionTitle";
import {
  ClientsList,
  ClientsSection,
  ClientsStyled,
  ClientStyled,
} from "./styles";

type ClientQueryResult = inferQueryOutput<"clients.getAll">[number];

export const ClientsCarousel: React.FC<{ clients: ClientQueryResult[] }> = ({
  clients,
}) => {
  return (
    <ClientsSection>
      <SectionTitle>Clients</SectionTitle>
      <ClientsStyled>
        <ClientsList>
          {clients &&
            clients.map((client) => (
              <Client key={client.id} logo={client.logo} name={client.name} />
            ))}
        </ClientsList>
        {/* Stupid fix to make it infinite */}
        <ClientsList>
          {clients &&
            clients.map((client) => (
              <Client key={client.id} logo={client.logo} name={client.name} />
            ))}
        </ClientsList>
      </ClientsStyled>
    </ClientsSection>
  );
};

const Client: React.FC<{ logo: string; name: string }> = ({ logo, name }) => (
  <ClientStyled>
    <img src={logo} alt={name} />
  </ClientStyled>
);
