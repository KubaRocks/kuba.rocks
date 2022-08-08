import { trpc } from "@app/utils/trpc";
import Image from "next/dist/client/future/image";

export const ClientsCarousel = () => {
  const { data, isLoading } = trpc.useQuery(["clients.getAll"]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h2>Clients</h2>
      <ul>
        {data &&
          data.map((client) => (
            <li key={client.id}>
              <Image
                src={client.logo}
                alt={client.name}
                height={50}
                width={50}
                style={{
                  width: "auto",
                  height: "50px",
                }}
              />
            </li>
          ))}
      </ul>
    </>
  );
};
