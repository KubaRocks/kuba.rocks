import { NextPage } from "next";
import { inferQueryOutput, trpc } from "@app/utils/trpc";
import styled from "styled-components";
import { PageTitle } from "@app/components/common/PageTitle";
import { SectionTitle } from "@app/components/common/SectionTitle";
import { ResumeItem } from "@app/components/resume/ResumeItem";
import { useFunFacts } from "@app/hooks/useFunFacts";

const ResumePageStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: var(--maxWidth);
  margin: 0 auto;
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`;

export const ListStyled = styled.ul`
  list-style: none;
  padding: 0;
`;

export type Experience = inferQueryOutput<"experience.getAll">[number];
export type Education = inferQueryOutput<"education.getAll">[number];

const ResumePage: NextPage = () => {
  const { data: experience, isLoading: experienceLoading } = trpc.useQuery([
    "experience.getAll",
  ]);
  const { data: education, isLoading: educationLoading } = trpc.useQuery([
    "education.getAll",
  ]);
  const { yearsOfExperience } = useFunFacts();

  if (experienceLoading || educationLoading) return <p>Loading...</p>;

  return (
    <>
      <PageTitle
        title="Resume"
        subtitle={`${yearsOfExperience} years of experience`}
      />
      <ResumePageStyled>
        <div>
          <SectionTitle>Experience</SectionTitle>
          <ListStyled>
            {experience &&
              experience.map((experienceEntry) => (
                <ResumeItem
                  key={experienceEntry.id}
                  resumeItem={experienceEntry}
                />
              ))}
          </ListStyled>
        </div>
        <div>
          <SectionTitle>Education and Courses</SectionTitle>
          <ListStyled>
            {education &&
              education.map((educationEntry) => (
                <ResumeItem
                  key={educationEntry.id}
                  resumeItem={educationEntry}
                />
              ))}
          </ListStyled>
        </div>
      </ResumePageStyled>
    </>
  );
};

export default ResumePage;
