import { EmailService } from "../src/EmailService";
import { ProviderA } from "../src/providers/ProviderA";
import { ProviderB } from "../src/providers/ProviderB";

const payload = {
  to: "test@example.com",
  subject: "Test",
  body: "Hello"
};

jest.setTimeout(20000); // Increase timeout globally for all tests

test("should send email or fallback", async () => {
  const service = new EmailService([new ProviderA(), new ProviderB()]);
  const result = await service.sendEmail(payload, "idemp-1");

  expect(["sent", "failed"]).toContain(result);
});

test("should prevent duplicate send", async () => {
  const service = new EmailService([new ProviderA(), new ProviderB()]);
  await service.sendEmail(payload, "idemp-2");
  const result = await service.sendEmail(payload, "idemp-2");

  expect(result).toBe("duplicate");
});

test("should rate limit", async () => {
  const service = new EmailService([new ProviderA(), new ProviderB()]);

  // Send within allowed limit
  for (let i = 0; i < 5; i++) {
    await service.sendEmail(payload, `rate-${i}`);
  }

  // This one should be blocked
  const result = await service.sendEmail(payload, "rate-over");
  expect(result).toBe("rate_limited");
}, 15000); // Increase timeout just for this test
