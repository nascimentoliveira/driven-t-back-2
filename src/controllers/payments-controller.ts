import { queryParamRequired } from "@/errors/query-param-required";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const paymentParams = {
      ticketId: req.body.ticketId,
      cardIssuer: req.body.cardData.issuer,
      cardLastDigits: req.body.cardData.number.substr(-4)
    };
    const payment = await paymentsService.createPayment(req.userId, paymentParams);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function findPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);
    if (!ticketId) {
      throw queryParamRequired("ticketId");
    }
    const payment = await paymentsService.findPayment(req.userId, ticketId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
