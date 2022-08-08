import { NextPage } from "next";
import { trpc } from "@app/utils/trpc";

const ResumePage: NextPage = () => {
  const { data: experience, isLoading: experienceLoading } = trpc.useQuery([
    "experience.getAll",
  ]);

  if (experienceLoading) return <p>Loading...</p>;

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
                experienceEntry.highlights instanceof Array &&
                experienceEntry.highlights.map((highlight, index) => (
                  <>
                    &raquo; {highlight}
                    <br />
                  </>
                ))}
            </div>
          ))}
      </ul>
    </>
  );
};

export default ResumePage;
