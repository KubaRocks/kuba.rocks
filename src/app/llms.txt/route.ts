import { buildLlmsTxt } from "@/lib/llms";

// Built at deploy time and refreshed daily, like the pages (years of experience)
export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
