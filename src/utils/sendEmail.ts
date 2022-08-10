import { ServerClient } from "postmark";
import { env } from "@app/env/server.mjs";
import { ContactFormData } from "@app/types/contact.schema";

const client = new ServerClient(env.POSTMARK_SERVER_TOKEN);
type DataForEmail = Pick<ContactFormData, "fullName" | "message" | "email">;

function generateHtmlBody({ email, fullName, message }: DataForEmail) {
  return `
  <style>
     div {width: 50%; min-width: 480px;}
  </style>
  <div>
    <h2 style="font-weight: lighter; margin: 2rem;">
        <a href="mailto:${email}">${fullName}</a>
        just sent you a message from <em>kuba.rocks</em> contact form.
    </h2>
  </div>
  <hr />
  <div style="color: darkslategrey; font-size: 1.2rem; margin: 1rem; padding: 2rem; background: lightgray">
    ${message.replace(/(?:\r\n|\r|\n)/g, "<br>")}
  </div>
  `;
}

export async function sendContactEmail({
  fullName,
  email,
  subject,
  message,
}: ContactFormData) {
  const HtmlBody = generateHtmlBody({
    fullName,
    message,
    email,
  });

  // send the email
  const info = await client.sendEmail({
    From: `${fullName} <${env.MAIL_FROM}>`,
    To: env.MAIL_TO,
    ReplyTo: email,
    Subject: `🤘${subject} - from kuba.rocks contact form`,
    HtmlBody,
    MessageStream: "outbound",
  });

  console.log("Sending email via postmark", { info });
}
