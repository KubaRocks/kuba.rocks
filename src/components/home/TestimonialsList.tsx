import { inferQueryOutput } from "@app/utils/trpc";
import { TestimonialItem } from "@app/components/home/TestimonialItem";
import styled from "styled-components";
import { SectionTitle } from "@app/components/common/SectionTitle";
import React from "react";

type TestimonialsList = inferQueryOutput<"testimonials.getAll">;
export type Testimonial = TestimonialsList[number];

const TestimonialsGrid = styled.div`
  margin-top: 6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialsSection = styled.section`
  margin: 2rem 0;
`;

export const TestimonialsList: React.FC<{ testimonials: Testimonial[] }> = ({
  testimonials,
}) => {
  return (
    <TestimonialsSection>
      <SectionTitle>Testimonials</SectionTitle>
      <TestimonialsGrid>
        {testimonials?.map((testimonial) => (
          <TestimonialItem key={testimonial.id} {...testimonial} />
        ))}
      </TestimonialsGrid>
    </TestimonialsSection>
  );
};
