import express, { Request, Response } from "express";
import { EmailService } from "./EmailService";
import { ProviderA } from "./providers/ProviderA";
import { ProviderB } from "./providers/ProviderB";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Email Service is up and running!");
});

const service = new EmailService([new ProviderA(), new ProviderB()]);

app.post("/send-email", async (req: Request, res: Response) => {
  const { to, subject, body, idempotencyKey } = req.body;
  const result = await service.sendEmail({ to, subject, body }, idempotencyKey);
  res.json({ status: result });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
"// redeploy" 
