import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { } from "@/controllers";
import { } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/")
  .post("/process");

export { paymentsRouter };
