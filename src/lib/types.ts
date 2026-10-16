export interface Testimonial {
  name: string;
  title: string;
  photo: string;
  headline: string;
  content: string;
}

export interface Client {
  name: string;
  logo: string;
}

export interface Experience {
  company: string;
  title: string;
  description: string | null;
  highlights: string[];
  startDate: string;
  endDate: string | null;
}

export interface Education {
  institution: string;
  title: string;
  description: string | null;
  date: string;
}

export interface SkillTier {
  tag: string;
  name: string;
  blurb: string;
  kind: "franchise" | "breakout" | "chips" | "retired";
  items: { name: string; note?: string }[];
}
