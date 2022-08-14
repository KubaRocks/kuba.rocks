import styled from "styled-components";

export const BurgerStyled = styled.button<{ open: boolean }>`
  @media (max-width: 475px) {
    display: flex;
  }
  position: absolute;
  top: 6rem;
  right: 3rem;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.6rem;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  &:focus {
    outline: none;
  }
  span {
    width: 2rem;
    height: 0.25rem;
    background: var(--black);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    :nth-child(2) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
