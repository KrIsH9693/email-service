"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const IdempotencyStore_1 = require("./utils/IdempotencyStore");
const RateLimiter_1 = require("./utils/RateLimiter");
const StatusTracker_1 = require("./utils/StatusTracker");
const logger_1 = require("./logger");
class EmailService {
    constructor(providers, rateLimiter = new RateLimiter_1.RateLimiter(5), idempotencyStore = new IdempotencyStore_1.IdempotencyStore(), statusTracker = new StatusTracker_1.StatusTracker()) {
        this.providers = providers;
        this.rateLimiter = rateLimiter;
        this.idempotencyStore = idempotencyStore;
        this.statusTracker = statusTracker;
    }
    async sendEmail(payload, idempotencyKey) {
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
                    (0, logger_1.log)(`Attempt ${attempt + 1} with ${provider.name}`);
                    const result = await provider.sendEmail(payload);
                    if (result) {
                        this.idempotencyStore.storeKey(idempotencyKey);
                        this.statusTracker.setStatus(idempotencyKey, "sent");
                        return "sent";
                    }
                }
                catch (err) {
                    (0, logger_1.log)(`${provider.name} failed: ${err}`);
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
exports.EmailService = EmailService;
