import { ServerClient } from "postmark";

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
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br />")}</p>
    `,
    MessageStream: "outbound",
  });
}
