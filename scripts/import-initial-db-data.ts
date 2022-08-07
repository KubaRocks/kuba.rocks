import { PrismaClient } from "@prisma/client";
import clients from "../prisma/initial/clients.json";
import testimonials from "../prisma/initial/testimonials.json";

const prisma = new PrismaClient();

const doImport = async () => {
  await prisma.client.deleteMany();
  console.log("✅ Clients table cleared");

  const clientsImportStatus = await prisma.client.createMany({
    data: clients,
  });

  console.log("Clients import?", clientsImportStatus);

  await prisma.testimonial.deleteMany();
  console.log("✅ Testimonials table cleared");

  const testimonialsImportStatus = await prisma.testimonial.createMany({
    data: testimonials,
  });

  console.log("Testimonials import?", testimonialsImportStatus);
};

doImport();
