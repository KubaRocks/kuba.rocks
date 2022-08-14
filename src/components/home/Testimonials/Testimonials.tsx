import Image from "next/dist/client/future/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { inferQueryOutput } from "@app/utils/trpc";
import { SectionTitle } from "@app/components/common/SectionTitle";
import React from "react";
import {
  TestimonialsGrid,
  TestimonialsSection,
  TestimonialStyled,
} from "./styles";

type TestimonialsList = inferQueryOutput<"testimonials.getAll">;
export type Testimonial = TestimonialsList[number];

export const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({
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

const TestimonialItem: React.FC<Testimonial> = ({
  authorName,
  authorPhoto,
  authorTitle,
  content,
}) => {
  return (
    <TestimonialStyled>
      <div className="photo">
        <Image src={`${authorPhoto}`} alt={authorName} width={80} height={80} />
      </div>
      <FaQuoteLeft className="openQuoteIcon" />
      <blockquote>{content}</blockquote>
      <FaQuoteRight className="closeQuoteIcon" />
      <h5>{authorName}</h5>
      <p>{authorTitle}</p>
    </TestimonialStyled>
  );
};
