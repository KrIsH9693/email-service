export class RateLimiter {
  private timestamps: number[] = [];

  constructor(private limit: number, private interval: number = 60000) {}

  allow(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(ts => now - ts < this.interval);
    if (this.timestamps.length >= this.limit) return false;

    this.timestamps.push(now);
    return true;
  }
}
