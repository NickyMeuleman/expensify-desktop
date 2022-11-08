import { t } from "../context";
import { z } from "zod";

export const storeRouter = t.router({
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.store.findMany();
  }),
  get: t.procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.store.findUnique({ where: { name: input.name } });
    }),
  create: t.procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.store.create({ data: { name: input.name } });
    }),
  rename: t.procedure
    .input(
      z.object({
        oldName: z.string(),
        newName: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.store.update({
        where: { name: input.oldName },
        data: { name: input.newName },
      });
    }),
  delete: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.store.delete({ where: { name: input.name } });
    }),
});
