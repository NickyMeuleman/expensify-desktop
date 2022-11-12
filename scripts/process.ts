import data from "./old_db.json" assert { type: "json" };
import { z } from "zod";

// these strict typescript ESLint rules don't play nice with the json import types.

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const expensesObj = data.users.L62LmFtGgRaCSoPXStVys4OUIjI2.expenses;
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const expenses = Object.values(expensesObj);

const STORENAMES = {
  aldi: "Aldi",
  carrefour: "Carrefour",
  spar: "Spar",
  kruidvat: "Kruidvat",
  bonap: "Bon Ap",
  aveve: "Aveve",
  inex: "Inex",
  makro: "Makro",
  pededrinks: "Pede Drinks",
  lidl: "Lidl",
  colruyt: "Colruyt",
  blokker: "Blokker",
  action: "Action",
  delhaize: "AD Delhaize",
  brico: "Brico",
};

// letting inferrence work causes ts errors when I try to use this
const storeMap: Record<string, string> = {
  aldi: STORENAMES.aldi,
  carrefour: STORENAMES.carrefour,
  spar: STORENAMES.spar,
  kruidvat: STORENAMES.kruidvat,
  bonap: STORENAMES.bonap,
  aveve: STORENAMES.aveve,
  "carrefour ": STORENAMES.carrefour,
  inex: STORENAMES.inex,
  ALDI: STORENAMES.aldi,
  CARREFOUR: STORENAMES.carrefour,
  varrefour: STORENAMES.carrefour,
  makro: STORENAMES.makro,
  "pede drinks": STORENAMES.pededrinks,
  carefour: STORENAMES.carrefour,
  "bon ap": STORENAMES.bonap,
  Carrefour: STORENAMES.carrefour,
  lidl: STORENAMES.lidl,
  colruyt: STORENAMES.colruyt,
  carrafour: STORENAMES.carrefour,
  blokker: STORENAMES.blokker,
  "bon,ap": STORENAMES.bonap,
  action: STORENAMES.action,
  brico: STORENAMES.brico,
  " carrefour": STORENAMES.carrefour,
  Spar: STORENAMES.spar,
  colryt: STORENAMES.colruyt,
  Colruyt: STORENAMES.colruyt,
  Aldi: STORENAMES.aldi,
  "Bon App": STORENAMES.bonap,
  BonAp: STORENAMES.bonap,
  "AD Delhaize": STORENAMES.delhaize,
  Lidl: STORENAMES.lidl,
  Kruidvat: STORENAMES.kruidvat,
  "Bon Ap": STORENAMES.bonap,
};

const expenseZod = z.object({
  date: z.date(),
  store: z.string(),
  fullAmount: z.number().int(),
  paidAmount: z.number().int(),
  note: z.string().nullable(),
  description: z.string().nullable(),
});

type Expense = z.infer<typeof expenseZod>;

const stores = new Set<string>();
const mappedExpenses: Expense[] = [];
for (const expense of expenses) {
  const description = expense.description as string;
  const store = storeMap[description] ?? description;
  stores.add(store);

  const mapped = {
    date: new Date(expense.createdAt as number),
    store,
    fullAmount: Math.round(expense.amount as number),
    paidAmount: Math.round(expense.paidAmount as number),
    note: (expense?.note as string) || null,
    description: null,
  };
  const parsed = expenseZod.parse(mapped);
  mappedExpenses.push(parsed);
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   for (const store of stores) {
  //     await prisma.store.create({ data: { name: store } });
  //   }
  //   for (const expense of mappedExpenses) {
  //     await prisma.expense.create({
  //       data: {
  //         date: expense.date,
  //         fullAmount: expense.fullAmount,
  //         paidAmount: expense.paidAmount,
  //         description: expense.description,
  //         note: expense.note,
  //         store: { connect: { name: expense.store } },
  //       },
  //     });
  //   }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
