import { inferQueryOutput, trpc } from "@app/utils/trpc";
import { TestimonialItem } from "@app/components/home/TestimonialItem";
import styled from "styled-components";
import { SectionTitle } from "@app/components/common/SectionTitle";

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

export const TestimonialsList = () => {
  const { data, isLoading } = trpc.useQuery(["testimonials.getAll"]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <TestimonialsSection>
      <SectionTitle>Testimonials</SectionTitle>
      <TestimonialsGrid>
        {data?.map((testimonial) => (
          <TestimonialItem key={testimonial.id} {...testimonial} />
        ))}
      </TestimonialsGrid>
    </TestimonialsSection>
  );
};
