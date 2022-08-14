import styled from "styled-components";

export const SectionTitleStyles = styled.h2`
  display: inline-block;
  position: relative;
  font-size: 2.1rem;
  padding-bottom: 0.7rem;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    height: 2px;
    background-color: var(--almostWhiteGrey);
    width: 100%;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    background-color: var(--astral);
    width: 3rem;
  }
`;
