import { GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import { inferQueryOutput, trpc } from "@app/utils/trpc";
import { PageTitle } from "@app/components/common/PageTitle";
import { SectionTitle } from "@app/components/common/SectionTitle";
import { ResumeItem } from "@app/components/resume/ResumeItem";
import { useFunFacts } from "@app/hooks/useFunFacts";
import { DAY_IN_SECONDS } from "@app/utils/dateHelpers";
import { createSSGHelpers } from "@trpc/react/ssg";
import { appRouter } from "@app/server/router";
import { createContext } from "@app/server/router/context";
import superjson from "superjson";

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
  const { yearsOfExperience } = useFunFacts();
  const { data: experience } = trpc.useQuery(["experience.getAll"]);
  const { data: education } = trpc.useQuery(["education.getAll"]);

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

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  await ssg.fetchQuery("experience.getAll");
  await ssg.fetchQuery("education.getAll");

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: DAY_IN_SECONDS,
  };
};
