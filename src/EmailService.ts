import { EmailProvider, EmailPayload } from "./providers/EmailProvider";
import { IdempotencyStore } from "./utils/IdempotencyStore";
import { RateLimiter } from "./utils/RateLimiter";
import { StatusTracker, EmailStatus } from "./utils/StatusTracker";
import { log } from "./logger";

export class EmailService {
  constructor(
    private providers: EmailProvider[],
    private rateLimiter = new RateLimiter(5),
    private idempotencyStore = new IdempotencyStore(),
    private statusTracker = new StatusTracker()
  ) {}

  async sendEmail(payload: EmailPayload, idempotencyKey: string): Promise<EmailStatus> {
    if (this.idempotencyStore.exists(idempotencyKey)) {
      this.statusTracker.setStatus(idempotencyKey, "duplicate");
      return "duplicate";
    }

    if (!this.rateLimiter.allow()) {
      this.statusTracker.setStatus(idempotencyKey, "rate_limited");
      return "rate_limited";
    }

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      let attempt = 0;
      let delay = 500;

      while (attempt < 3) {
        try {
          log(`Attempt ${attempt + 1} with ${provider.name}`);
          const result = await provider.sendEmail(payload);
          if (result) {
            this.idempotencyStore.storeKey(idempotencyKey);
            this.statusTracker.setStatus(idempotencyKey, "sent");
            return "sent";
          }
        } catch (err) {
          log(`${provider.name} failed: ${err}`);
        }

        attempt++;
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
      }
    }

    this.statusTracker.setStatus(idempotencyKey, "failed");
    return "failed";
  }
}
