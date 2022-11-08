import { z } from "zod";
import { t } from "../context";
import { exampleRouter } from "./example";
import { expenseRouter } from "./expense";
import { storeRouter } from "./store";
import { voucherRouter } from "./voucher";

export const appRouter = t.router({
  example: exampleRouter,
  voucher: voucherRouter,
  store: storeRouter,
  expense: expenseRouter,
  greeting: t.procedure
    .input(z.object({ name: z.string() }).nullish())
    .query(({ input }) => {
      return `hello tRPC v10, ${input?.name ?? "world"}!`;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
