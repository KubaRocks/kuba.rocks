import styled from "styled-components";
import { SectionTitle } from "@app/components/common/SectionTitle";

const ContainerStyled = styled.div`
  grid-column: span 2;
`;

export const ContactForm = () => {
  return (
    <ContainerStyled>
      <SectionTitle>How Can I Help You?</SectionTitle>
    </ContainerStyled>
  );
};
