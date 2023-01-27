import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicket, listTicket, listTicketTypes } from "@/controllers";
import { ticketsSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", listTicket)
  .get("/types", listTicketTypes)
  .post("/", validateBody(ticketsSchema), createTicket);

export { ticketsRouter };
