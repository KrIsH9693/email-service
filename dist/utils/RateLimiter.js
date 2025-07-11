"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
class RateLimiter {
    constructor(limit, interval = 60000) {
        this.limit = limit;
        this.interval = interval;
        this.timestamps = [];
    }
    allow() {
        const now = Date.now();
        this.timestamps = this.timestamps.filter(ts => now - ts < this.interval);
        if (this.timestamps.length >= this.limit)
            return false;
        this.timestamps.push(now);
        return true;
    }
}
exports.RateLimiter = RateLimiter;
