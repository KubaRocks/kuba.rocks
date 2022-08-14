import React from "react";
import { Prisma } from ".prisma/client";
import { Experience } from "@app/pages/resume";
import { ResumeItemStyled } from "./styles";
import JsonValue = Prisma.JsonValue;

type Item = Pick<Experience, "title" | "description" | "company"> & {
  startDate?: Date | null;
  endDate?: Date | null;
  date?: Date;
  highlights?: JsonValue;
};

export const ResumeItem: React.FC<{ resumeItem: Item }> = ({ resumeItem }) => {
  const formatYears = (start: Date, end?: Date) => {
    const startYear = new Date(start).getFullYear();
    const endYear = end ? new Date(end).getFullYear() : "now";

    return startYear === endYear || !endYear
      ? startYear
      : `${startYear} - ${endYear}`;
  };

  return (
    <ResumeItemStyled>
      <h5>
        {resumeItem.date && new Date(resumeItem.date).getFullYear()}
        {resumeItem.startDate &&
          formatYears(resumeItem.startDate, resumeItem.endDate ?? undefined)}
      </h5>
      <aside>{resumeItem.company}</aside>
      <h4>{resumeItem.title}</h4>
      <div className="description">
        {resumeItem.description && <p>{resumeItem.description}</p>}

        {resumeItem.highlights && resumeItem.highlights instanceof Array && (
          <ul className="description">
            {resumeItem.highlights.map((highlight, index) => (
              <li key={index}>{highlight as string}</li>
            ))}
          </ul>
        )}
      </div>
    </ResumeItemStyled>
  );
};
