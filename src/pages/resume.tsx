import { GetStaticProps, NextPage } from "next";
import { inferQueryOutput } from "@app/utils/trpc";
import styled from "styled-components";
import { PageTitle } from "@app/components/common/PageTitle";
import { SectionTitle } from "@app/components/common/SectionTitle";
import { ResumeItem } from "@app/components/resume/ResumeItem";
import { useFunFacts } from "@app/hooks/useFunFacts";
import { prisma } from "@app/server/db/client";
import safeJsonStringify from "safe-json-stringify";

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

const ResumePage: NextPage<{
  experience: Experience[];
  education: Education[];
}> = ({ experience, education }) => {
  const { yearsOfExperience } = useFunFacts();

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

const getExperience = async () => {
  return prisma.experience.findMany();
};

const getEducation = async () => {
  return prisma.education.findMany();
};

export const getStaticProps: GetStaticProps = async () => {
  const experience = await getExperience();
  const education = await getEducation();

  return {
    props: {
      experience: JSON.parse(safeJsonStringify(experience)),
      education: JSON.parse(safeJsonStringify(education)),
    },
  };
};
