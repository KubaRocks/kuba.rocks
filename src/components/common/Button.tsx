import styled, { css } from "styled-components";

export const Button = styled.a<{ secondary?: boolean }>`
  --textColor: var(--black);
  --textHoverColor: white;
  --backgroundHoverColor: var(--astral);
  --borderColor: var(--astral);
  --borderHoverColor: var(--oxfordBlue);
  display: inline-block;
  border-radius: 30px;
  border: 2px solid var(--borderColor);
  padding: 1rem 3rem;
  background-color: white;
  text-align: center;
  font-size: 1.4rem;
  cursor: pointer;
  color: var(--black);
  box-shadow: 0 10px 10px -8px rgba(0, 0, 0, 0.22);
  margin: 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--backgroundHoverColor);
    color: var(--textHoverColor);
    border-color: var(--borderHoverColor);
  }

  ${(props) =>
    props.secondary &&
    css`
      --borderColor: var(--veryLightGrey);
      --borderHoverColor: var(--veryLightGrey);
      --backgroundHoverColor: var(--veryLightGrey);
      --textHoverColor: black;
    `}
`;
