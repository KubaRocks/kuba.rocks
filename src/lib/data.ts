import { readFileSync } from "fs";
import { join } from "path";
import JSON5 from "json5";
import type {
  Testimonial,
  Client,
  Experience,
  Education,
  Technology,
} from "./types";

const dataDir = join(process.cwd(), "data");

function loadJSON5<T>(filename: string): T {
  const raw = readFileSync(join(dataDir, filename), "utf-8");
  return JSON5.parse(raw);
}

export function getTestimonials(): Testimonial[] {
  return loadJSON5<Testimonial[]>("testimonials.json5");
}

export function getClients(): Client[] {
  return loadJSON5<Client[]>("clients.json5");
}

export function getExperience(): Experience[] {
  return loadJSON5<Experience[]>("experience.json5");
}

export function getEducation(): Education[] {
  return loadJSON5<Education[]>("education.json5");
}

export function getTechnologies(): Technology[] {
  return loadJSON5<Technology[]>("technologies.json5");
}
