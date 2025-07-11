import { EmailProvider, EmailPayload } from "./EmailProvider";

export class ProviderA implements EmailProvider {
  name = "ProviderA";

  async sendEmail(payload: EmailPayload): Promise<boolean> {
    if (Math.random() < 0.5) throw new Error("ProviderA failed");
    return true;
  }
}
