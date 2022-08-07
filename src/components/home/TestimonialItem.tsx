import React from "react";
import { Testimonial } from "./TestimonialsList";
import Image from "next/dist/client/future/image";

export const TestimonialItem: React.FC<Testimonial> = ({
  authorName,
  authorPhoto,
  authorTitle,
  content,
}) => {
  return (
    <div>
      <div className="photo">
        <Image
          src={`${authorPhoto}`}
          alt={authorName}
          width={200}
          height={200}
        />
      </div>
      <blockquote>{content}</blockquote>
      <h5>{authorName}</h5>
      <p>{authorTitle}</p>
    </div>
  );
};
