import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(ticket: Prisma.TicketUncheckedCreateInput) {
  return prisma.ticket.create({
    data: ticket,
  });
}

async function find(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
  });
}

async function listTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketType(ticketTypeId: number) {
  return prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId,
    },
  });
}

const ticketRepository = {
  create,
  find,
  listTicketTypes,
  findTicketType,
};

export default ticketRepository;
