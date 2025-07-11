export class IdempotencyStore {
  private store = new Set<string>();

  exists(key: string): boolean {
    return this.store.has(key);
  }

  storeKey(key: string): void {
    this.store.add(key);
  }
}
