import { PrismaClient } from "@prisma/client";
import clients from "../prisma/initial/clients.json";
import testimonials from "../prisma/initial/testimonials.json";
import experience from "../prisma/initial/experience.json";

const prisma = new PrismaClient();

const doImport = async () => {
  await prisma.client.deleteMany();
  console.log("\n✅ Clients table cleared");

  const clientsImportStatus = await prisma.client.createMany({
    data: clients,
  });

  console.log("Clients import?", clientsImportStatus);

  await prisma.testimonial.deleteMany();
  console.log("\n✅ Testimonials table cleared");

  const testimonialsImportStatus = await prisma.testimonial.createMany({
    data: testimonials,
  });

  console.log("Testimonials import?", testimonialsImportStatus);

  await prisma.experience.deleteMany();
  console.log("\n✅ Experience table cleared");

  const experienceImportStatus = await prisma.experience.createMany({
    data: experience.map((experienceEntry) => ({
      company: experienceEntry.company,
      title: experienceEntry.title,
      description: experienceEntry.description ?? undefined,
      highlights: experienceEntry.highlights ?? undefined,
      startDate: new Date(experienceEntry.startDate),
      endDate: experienceEntry.endDate
        ? new Date(experienceEntry.endDate)
        : undefined,
    })),
  });

  console.log("Experience import?", experienceImportStatus);
};

doImport();
