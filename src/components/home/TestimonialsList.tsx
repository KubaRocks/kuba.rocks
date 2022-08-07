import { inferQueryOutput, trpc } from "@app/utils/trpc";
import { TestimonialItem } from "@app/components/home/TestimonialItem";

type TestimonialsList = inferQueryOutput<"testimonials.getAll">;
export type Testimonial = TestimonialsList[number];

export const TestimonialsList = () => {
  const { data, isLoading } = trpc.useQuery(["testimonials.getAll"]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <h3>Testimonials</h3>
      {data?.map((testimonial) => (
        <TestimonialItem key={testimonial.id} {...testimonial} />
      ))}
    </section>
  );
};
