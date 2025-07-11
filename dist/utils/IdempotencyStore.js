"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdempotencyStore = void 0;
class IdempotencyStore {
    constructor() {
        this.store = new Set();
    }
    exists(key) {
        return this.store.has(key);
    }
    storeKey(key) {
        this.store.add(key);
    }
}
exports.IdempotencyStore = IdempotencyStore;
