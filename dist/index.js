"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmailService_1 = require("./EmailService");
const ProviderA_1 = require("./providers/ProviderA");
const ProviderB_1 = require("./providers/ProviderB");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Email Service is up and running!");
});
const service = new EmailService_1.EmailService([new ProviderA_1.ProviderA(), new ProviderB_1.ProviderB()]);
app.post("/send-email", async (req, res) => {
    const { to, subject, body, idempotencyKey } = req.body;
    const result = await service.sendEmail({ to, subject, body }, idempotencyKey);
    res.json({ status: result });
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
