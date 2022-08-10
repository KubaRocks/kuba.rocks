import styled from "styled-components";
import { ImLocation, ImMobile, ImUsers } from "react-icons/im";
import React, { PropsWithChildren, ReactElement } from "react";
import { ContactChannels } from "@app/components/common/ContactChannels";

const ContactDetailsStyled = styled.div`
  display: grid;
  .icons {
    font-size: 3rem;
    margin-left: -1rem;
  }
`;

export const ContactDetails = () => (
  <ContactDetailsStyled>
    <ContactDetailItem icon={<ImMobile />}>
      <h4>Mobile</h4>
      <p>
        <a href="tel:+48501290425">+48 501 290 425</a>
      </p>
    </ContactDetailItem>
    <ContactDetailItem icon={<ImLocation />}>
      <h4>Location</h4>
      <p>Warsaw, Poland</p>
    </ContactDetailItem>
    <ContactDetailItem icon={<ImUsers />}>
      <h4>Socials</h4>
      <ContactChannels />
    </ContactDetailItem>
  </ContactDetailsStyled>
);

const ContactDetailItemStyles = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
`;

const ContactDetailItem: React.FC<
  { icon: ReactElement } & PropsWithChildren
> = ({ icon, children }) => (
  <ContactDetailItemStyles>
    <div>{icon}</div>
    <div>{children}</div>
  </ContactDetailItemStyles>
);
