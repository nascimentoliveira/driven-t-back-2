import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketsService.createTicket(req.body.ticketTypeId, req.userId);
    const ticketType = await ticketsService.findTicketType(req.body.ticketTypeId);
    return res.status(httpStatus.CREATED).send({
      id: ticket.id,
      status: ticket.status,
      ticketTypeId: ticket.ticketTypeId,
      enrollmentId: ticket.enrollmentId,
      TicketType: ticketType,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({});
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function listTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketsService.listTicket(req.userId);
    const ticketType = await ticketsService.findTicketType(ticket.ticketTypeId);
    return res.status(httpStatus.OK).send({
      id: ticket.id,
      status: ticket.status,
      ticketTypeId: ticket.ticketTypeId,
      enrollmentId: ticket.enrollmentId,
      TicketType: ticketType,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({});
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function listTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.listTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
