export type EmailStatus = 'sent' | 'duplicate' | 'rate_limited' | 'failed';

export class StatusTracker {
  private statusMap = new Map<string, EmailStatus>();

  setStatus(idempotencyKey: string, status: EmailStatus) {
    this.statusMap.set(idempotencyKey, status);
  }

  getStatus(idempotencyKey: string): EmailStatus | undefined {
    return this.statusMap.get(idempotencyKey);
  }
}
