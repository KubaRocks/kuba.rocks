import { getTestimonials, getClients, getExperience, getEducation, getTechnologies } from "@/lib/data";
import { getYearsOfExperience, getWorkingHours, getCoffeeConsumed, GITHUB_REPOS } from "@/lib/fun-facts";

export default function Home() {
  const testimonials = getTestimonials();
  const clients = getClients();
  const experience = getExperience();
  const education = getEducation();
  const technologies = getTechnologies();

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-accent">Data Loading Check</h1>
      <p>{testimonials.length} testimonials</p>
      <p>{clients.length} clients</p>
      <p>{experience.length} experience entries</p>
      <p>{education.length} education entries</p>
      <p>{technologies.length} technologies</p>
      <hr />
      <p>{getYearsOfExperience()} years of experience</p>
      <p>{getWorkingHours().toLocaleString()} working hours</p>
      <p>{getCoffeeConsumed().toLocaleString()} coffees</p>
      <p>{GITHUB_REPOS} repos</p>
    </main>
  );
}
