import styled from "styled-components";

export const FooterStyled = styled.footer`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 6rem 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 2rem;
  color: var(--grey);
  font-size: 1.4rem;
  border-top: 2px solid var(--almostWhiteGrey);
  background: #fdfdfd;

  @media (max-width: 375px) {
    padding: 0 1rem;
  }

  nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  div {
    justify-self: end;
  }

  span {
    @media (max-width: 320px) {
      display: none;
    }
  }
`;
