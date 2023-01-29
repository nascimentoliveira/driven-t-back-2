import { prisma } from "@/config";
import { Payment, Prisma } from "@prisma/client";

async function create(payment: Prisma.PaymentUncheckedCreateInput): Promise<Payment> {
  return prisma.payment.create({
    data: payment,
  });
}

async function find(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

const paymentRepository = {
  create,
  find,
};

export default paymentRepository;
