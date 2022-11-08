import { t } from "../context";
import { z } from "zod";

export const expenseRouter = t.router({
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.expense.findMany();
  }),
  get: t.procedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.expense.findUnique({ where: { id: input.id } });
    }),
  create: t.procedure
    .input(
      z.object({
        date: z.date(),
        fullAmount: z.number().int(),
        paidAmount: z.number().int(),
        storeName: z.string(),
        note: z.string().nullable(),
        description: z.string().nullable(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.expense.create({
        data: {
          date: input.date,
          fullAmount: input.fullAmount,
          paidAmount: input.paidAmount,
          store: { connect: { name: input.storeName } },
          note: input.note,
          description: input.description,
        },
      });
    }),
  update: t.procedure
    .input(
      z.object({
        id: z.string().uuid(),
        storeName: z.string(),
        date: z.date(),
        fullAmount: z.number().int(),
        paidAmount: z.number().int(),
        note: z.string(),
        description: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, storeName, ...rest } = input;
      return ctx.prisma.expense.update({
        where: { id },
        data: { store: { connect: { name: storeName } }, ...rest },
      });
    }),
  delete: t.procedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.expense.delete({ where: { id: input.id } });
    }),
});
