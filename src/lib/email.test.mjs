import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";

const { sendContactEmail } = createRequire(import.meta.url)("./email.ts");

function configureEmail(t) {
  const values = {
    POSTMARK_SERVER_TOKEN: "test-server-token",
    MAIL_FROM: "sender@example.com",
    MAIL_TO: "owner@example.com",
  };

  for (const [key, value] of Object.entries(values)) {
    const original = process.env[key];
    process.env[key] = value;
    t.after(() => {
      if (original === undefined) delete process.env[key];
      else process.env[key] = original;
    });
  }
}

test("contact email escapes submitted HTML and preserves line breaks", async (t) => {
  configureEmail(t);
  const fetch = t.mock.method(globalThis, "fetch", async () =>
    Response.json({ ErrorCode: 0, Message: "OK", MessageID: "test-message" })
  );

  await sendContactEmail({
    name: '<img src=x onerror="alert(1)"> & O\'Connor',
    email: "o'connor&team@example.com",
    message: 'First <script>alert("x")</script>\r\nSecond & third\nLast\rLine',
  });

  assert.equal(fetch.mock.callCount(), 1);
  const [url, request] = fetch.mock.calls[0].arguments;
  assert.equal(String(url), "https://api.postmarkapp.com/email");
  assert.equal(request.method, "POST");
  assert.equal(
    new Headers(request.headers).get("X-Postmark-Server-Token"),
    "test-server-token"
  );

  const email = JSON.parse(request.body);
  assert.equal(email.From, "sender@example.com");
  assert.equal(email.To, "owner@example.com");
  assert.equal(email.ReplyTo, "o'connor&team@example.com");
  assert.equal(email.MessageStream, "outbound");
  assert.ok(
    email.HtmlBody.includes(
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; O&#39;Connor"
    )
  );
  assert.ok(email.HtmlBody.includes("o&#39;connor&amp;team@example.com"));
  assert.ok(
    email.HtmlBody.includes(
      "First &lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;<br />Second &amp; third<br />Last<br />Line"
    )
  );
  assert.ok(!email.HtmlBody.includes("<img"));
  assert.ok(!email.HtmlBody.includes("<script"));
});

test("failed Postmark requests reject instead of reporting success", async (t) => {
  configureEmail(t);
  t.mock.method(globalThis, "fetch", async () =>
    Response.json(
      { ErrorCode: 300, Message: "Invalid email request" },
      { status: 422 }
    )
  );

  await assert.rejects(
    sendContactEmail({
      name: "Test visitor",
      email: "visitor@example.com",
      message: "A test contact message.",
    }),
    /Invalid email request/
  );
});
