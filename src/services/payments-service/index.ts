import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Payment, Ticket, TicketType } from "@prisma/client";

export async function createPayment(userId: number, payment: PaymentParams): Promise<Payment> {
  const ticket = await ticketExistOrFail(payment.ticketId);
  await userOwnTickectOrFail(userId, ticket.enrollmentId);
  const ticketType = await ticketTypeExistOrFail(ticket.ticketTypeId);
  const paymentInserted = await paymentRepository.create({ ...payment, value: ticketType.price });
  await changeTicketStatusPaid(ticket.id);
  return paymentInserted;
}

export async function findPayment(userId: number, ticketId: number): Promise<Payment> {
  const ticket = await ticketExistOrFail(ticketId);
  await userOwnTickectOrFail(userId, ticket.enrollmentId);
  const payment = await paymentRepository.find(ticketId);
  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function ticketExistOrFail(ticketId: number): Promise<Ticket> {
  const ticket = await ticketRepository.find(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

export async function userOwnTickectOrFail(userId: number, enrollmentId: number): Promise<void> {
  const enrollment = await enrollmentRepository.find(enrollmentId);
  if (!enrollment || enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

async function ticketTypeExistOrFail(ticketTypeId: number): Promise<TicketType> {
  const ticketType = await ticketRepository.findTicketType(ticketTypeId);
  if (!ticketType) {
    throw notFoundError();
  }
  return ticketType;
}

async function changeTicketStatusPaid(ticketId: number): Promise<void> {
  const ticket = await ticketRepository.updateToPaid(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
}

export type PaymentParams = Pick<Payment, "ticketId" | "cardIssuer" | "cardLastDigits">

const paymentsService = {
  createPayment,
  findPayment,
};

export default paymentsService;
