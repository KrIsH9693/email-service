"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderA = void 0;
class ProviderA {
    constructor() {
        this.name = "ProviderA";
    }
    async sendEmail(payload) {
        if (Math.random() < 0.5)
            throw new Error("ProviderA failed");
        return true;
    }
}
exports.ProviderA = ProviderA;
