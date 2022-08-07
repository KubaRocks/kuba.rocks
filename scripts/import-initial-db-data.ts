import { PrismaClient } from "@prisma/client";
import clients from "../prisma/initial/clients.json";
import testimonials from "../prisma/initial/testimonials.json";
import experience from "../prisma/initial/experience.json";
import education from "../prisma/initial/education.json";

const prisma = new PrismaClient();

const doImport = async () => {
  // Clients
  await prisma.client.deleteMany();
  console.log("\n✅ Clients table cleared");

  const clientsImportStatus = await prisma.client.createMany({
    data: clients,
  });

  console.log("Clients import?", clientsImportStatus);

  // Testimonials
  await prisma.testimonial.deleteMany();
  console.log("\n✅ Testimonials table cleared");

  const testimonialsImportStatus = await prisma.testimonial.createMany({
    data: testimonials,
  });

  console.log("Testimonials import?", testimonialsImportStatus);

  // Experience
  await prisma.experience.deleteMany();
  console.log("\n✅ Experience table cleared");

  const experienceImportStatus = await prisma.experience.createMany({
    data: experience.map((experienceEntry) => ({
      ...experienceEntry,
      startDate: new Date(experienceEntry.startDate),
      endDate: experienceEntry.endDate
        ? new Date(experienceEntry.endDate)
        : undefined,
    })),
  });

  console.log("Experience import?", experienceImportStatus);

  // Education
  await prisma.education.deleteMany();
  console.log("\n✅ Education table cleared");

  const educationImportStatus = await prisma.education.createMany({
    data: education.map((educationEntry) => ({
      ...educationEntry,
      date: new Date(educationEntry.date),
    })),
  });

  console.log("Education import?", educationImportStatus);
};

doImport();
