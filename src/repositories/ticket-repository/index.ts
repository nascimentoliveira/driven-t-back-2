import { prisma } from "@/config";
import { TicketReturn } from "@/protocols";
import { Prisma, Ticket, TicketType } from "@prisma/client";

async function create(ticket: Prisma.TicketUncheckedCreateInput): Promise<TicketReturn> {
  return prisma.ticket.create({
    data: ticket,
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function findByEnroll(enrollmentId: number): Promise<TicketReturn> {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function find(id: number): Promise<Ticket> {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
  });
}

async function listTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicketType(id: number): Promise<TicketType> {
  return prisma.ticketType.findUnique({
    where: {
      id,
    },
  });
}

async function updateToPaid(id: number): Promise<Ticket> {
  return prisma.ticket.update({
    data: {
      status: "PAID",
    },
    where: {
      id,
    }
  });
}

const ticketRepository = {
  create,
  find,
  findByEnroll,
  listTicketTypes,
  findTicketType,
  updateToPaid,
};

export default ticketRepository;
