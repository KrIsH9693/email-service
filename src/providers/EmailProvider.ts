export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface EmailProvider {
  name: string;
  sendEmail(payload: EmailPayload): Promise<boolean>;
}
