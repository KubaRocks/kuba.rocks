import { NextPage } from "next";
import { trpc } from "@app/utils/trpc";

const ResumePage: NextPage = () => {
  const { data: experience, isLoading: experienceLoading } = trpc.useQuery([
    "experience.getAll",
  ]);
  const { data: education, isLoading: educationLoading } = trpc.useQuery([
    "education.getAll",
  ]);

  if (experienceLoading || educationLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>Resume Page</h1>
      <h2>Experience</h2>
      <ul>
        {experience &&
          experience.map((experienceEntry) => (
            <div key={experienceEntry.id}>
              <h5>{experienceEntry.startDate.getFullYear()}</h5>
              <aside>{experienceEntry.company}</aside>
              <h4>{experienceEntry.title}</h4>
              {experienceEntry.description && (
                <div>{experienceEntry.description}</div>
              )}

              {experienceEntry.highlights &&
                experienceEntry.highlights instanceof Array && (
                  <ul>
                    {experienceEntry.highlights.map((highlight, index) => (
                      <li key={index}>{highlight as string}</li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
      </ul>

      <h2>Education and Courses</h2>
      <ul>
        {education &&
          education.map((educationEntry) => (
            <div key={educationEntry.id}>
              <h5>{educationEntry.date.getFullYear()}</h5>
              <aside>{educationEntry.company}</aside>
              <h4>{educationEntry.title}</h4>
              {educationEntry.description && (
                <div>{educationEntry.description}</div>
              )}
            </div>
          ))}
      </ul>
    </>
  );
};

export default ResumePage;
