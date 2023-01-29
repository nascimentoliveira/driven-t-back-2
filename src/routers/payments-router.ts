import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { createPayment, findPayment } from "@/controllers";
import { paymentsSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", findPayment)
  .post("/process", validateBody(paymentsSchema), createPayment);

export { paymentsRouter };
