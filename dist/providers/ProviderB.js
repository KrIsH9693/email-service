"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderB = void 0;
class ProviderB {
    constructor() {
        this.name = "ProviderB";
    }
    async sendEmail(payload) {
        if (Math.random() < 0.3)
            throw new Error("ProviderB failed");
        return true;
    }
}
exports.ProviderB = ProviderB;
