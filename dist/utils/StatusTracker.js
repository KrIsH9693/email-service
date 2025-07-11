"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusTracker = void 0;
class StatusTracker {
    constructor() {
        this.statusMap = new Map();
    }
    setStatus(idempotencyKey, status) {
        this.statusMap.set(idempotencyKey, status);
    }
    getStatus(idempotencyKey) {
        return this.statusMap.get(idempotencyKey);
    }
}
exports.StatusTracker = StatusTracker;
