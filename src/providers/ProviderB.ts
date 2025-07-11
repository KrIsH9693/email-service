import { EmailProvider, EmailPayload } from "./EmailProvider";

export class ProviderB implements EmailProvider {
  name = "ProviderB";

  async sendEmail(payload: EmailPayload): Promise<boolean> {
    if (Math.random() < 0.3) throw new Error("ProviderB failed");
    return true;
  }
}
