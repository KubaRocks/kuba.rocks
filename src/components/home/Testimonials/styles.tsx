import styled from "styled-components";

export const TestimonialsGrid = styled.div`
  margin-top: 6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

export const TestimonialsSection = styled.section`
  margin: 2rem 0;
`;

export const TestimonialStyled = styled.div`
  position: relative;
  border: 2px solid var(--veryLightGrey);
  border-radius: 1rem;
  padding: 3rem 2rem 2rem 6rem;
  font-size: 1.4rem;
  background-color: white;
  .photo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left: -30px;
    top: -30px;
  }
  blockquote {
    font-style: italic;
    color: var(--grey);
    line-height: 2.5rem;
    margin: 0 0 2rem;
  }
  p {
    color: var(--lightGrey);
    margin: 0;
    font-size: 1.1rem;
  }
  h5 {
    font-size: 1.3rem;
    line-height: 1.7rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }
  .openQuoteIcon {
    color: #e5e5e5;
    font-size: 2rem;
    position: absolute;
    left: 2rem;
    bottom: 4rem;
  }
  .closeQuoteIcon {
    color: #f5f5f5;
    font-size: 4rem;
    position: absolute;
    right: -2rem;
    bottom: -2rem;
    z-index: -1;
  }
`;
