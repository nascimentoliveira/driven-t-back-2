import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Enrollment, Ticket, TicketType } from "@prisma/client";

export async function createTicket(ticketTypeId: number, userId: number): Promise<Ticket> {
  const enrollment = await userHasEnrollOrFail(userId);
  const ticketType = await ticketTypeExistOrFail(ticketTypeId);

  return await ticketRepository.create({
    ticketTypeId: ticketType.id,
    enrollmentId: enrollment.id,
    status: "RESERVED",
  });
}

export async function findTicketType(ticketTypeId: number): Promise<TicketType> {
  return await ticketTypeExistOrFail(ticketTypeId);
}

export async function listTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketRepository.listTicketTypes();
  return ticketTypes;
}

export async function listTicket(userId: number): Promise<Ticket> {
  const enrollment = await userHasEnrollOrFail(userId);
  const ticket = await userHasTicketOrFail(enrollment.id);
  return ticket;
}

export async function userHasEnrollOrFail(userId: number): Promise<Enrollment> {
  const enrollment = await enrollmentRepository.findUserEnroll(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  return enrollment;
}

async function ticketTypeExistOrFail(ticketTypeId: number): Promise<TicketType> {
  const ticketType = await ticketRepository.findTicketType(ticketTypeId);
  if (!ticketType) {
    throw notFoundError();
  }
  return ticketType;
}

async function userHasTicketOrFail(enrollmentId: number): Promise<Ticket> {
  const ticket = await ticketRepository.findByEnroll(enrollmentId);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

const ticketsService = {
  createTicket,
  findTicketType,
  listTicketTypes,
  listTicket,
};

export default ticketsService;
