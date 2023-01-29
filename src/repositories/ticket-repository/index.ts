import { prisma } from "@/config";
import { Prisma, Ticket, TicketType } from "@prisma/client";

async function create(ticket: Prisma.TicketUncheckedCreateInput) {
  return prisma.ticket.create({
    data: ticket,
  });
}

async function findByEnroll(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
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
