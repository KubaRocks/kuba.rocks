import { ServerClient } from "postmark";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

  await client.sendEmail({
    From: process.env.MAIL_FROM!,
    To: process.env.MAIL_TO!,
    ReplyTo: email,
    Subject: `Message from ${name} — kuba.rocks contact form`,
    HtmlBody: `
      <h2>New message from kuba.rocks</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <hr />
      <p>${escapeHtml(message).replace(/\r\n?|\n/g, "<br />")}</p>
    `,
    MessageStream: "outbound",
  });
}
