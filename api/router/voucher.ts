import { t } from "../context";
import { z } from "zod";

export const voucherRouter = t.router({
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.voucher.findMany();
  }),
  get: t.procedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.voucher.findUnique({ where: { id: input.id } });
    }),
  create: t.procedure
    .input(
      z.object({
        date: z.date(),
        storeName: z.string(),
        fullAmount: z.number().int(),
        paidAmount: z.number().int(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.voucher.create({
        data: {
          date: input.date,
          store: { connect: { name: input.storeName } },
          fullAmount: input.fullAmount,
          paidAmount: input.paidAmount,
        },
      });
    }),
  update: t.procedure
    .input(
      z.object({
        id: z.string().uuid(),
        fullAmount: z.number().int(),
        paidAmount: z.number().int(),
        date: z.date(),
        storeName: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, storeName, ...rest } = input;
      return ctx.prisma.voucher.update({
        where: { id },
        data: { store: { connect: { name: storeName } }, ...rest },
      });
    }),
  delete: t.procedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.voucher.delete({ where: { id: input.id } });
    }),
});
