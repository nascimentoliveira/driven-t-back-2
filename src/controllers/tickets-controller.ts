import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function createTicket(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const ticket = await ticketsService.createTicket(req.body.ticketTypeId, req.userId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function listTicket(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const ticket = await ticketsService.listTicket(req.userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function listTicketTypes(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const ticketTypes = await ticketsService.listTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
