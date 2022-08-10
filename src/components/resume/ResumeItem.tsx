import React from "react";
import styled from "styled-components";
import { Experience } from "@app/pages/resume";
import { Prisma } from ".prisma/client";
import JsonValue = Prisma.JsonValue;

const ResumeItemStyled = styled.li`
  position: relative;
  padding: 2.5rem 0 2rem 4rem;
  font-size: 1.2rem;

  &:before {
    content: "";
    position: absolute;
    display: block;
    height: 100%;
    background-color: #f5f6f9;
    width: 1px;
    left: 15px;
    bottom: 5px;
    z-index: -1;
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    height: 1px;
    background-color: #f5f6f9;
    width: calc(100% - 15px);
    left: 15px;
    bottom: 3px;
  }

  h4 {
    font-size: 1.6rem;
    margin: 1rem 0 0.7rem;
  }

  h5 {
    display: inline-block;
    background-color: white;
    border: 2px solid var(--astral);
    border-radius: 3rem;
    padding: 0 1rem;
    line-height: 2.3rem;
    margin: 0 0 0.5rem -4rem;
    color: var(--grey);
    font-weight: 400;
  }

  aside {
    display: inline-block;
    color: var(--lightGrey);
    margin-left: 0.5rem;
  }

  .description {
    color: var(--grey);
    line-height: 2.5rem;
  }
`;

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
