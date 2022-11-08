import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // seed stores
  // await prisma.store.create({ data: { name: "Carrefour" } });
  // await prisma.store.create({ data: { name: "Bon Ap" } });
  // await prisma.store.create({ data: { name: "Spar" } });
  // await prisma.store.create({ data: { name: "Aldi" } });
  // await prisma.store.create({ data: { name: "Lidl" } });
  // await prisma.store.create({ data: { name: "Colruyt" } });

  // seed vouchers
  // await prisma.voucher.create({
  //   data: {
  //     date: new Date(),
  //     fullAmount: 200_000,
  //     paidAmount: 190_000,
  //     store: { connect: { name: "Carrefour" } },
  //   },
  // });

  // seed expenses
  // await prisma.expense.create({
  //   data: {
  //     date: new Date(),
  //     fullAmount: 50_000,
  //     paidAmount: 40_000,
  //     description: "boodschappen",
  //     note: "veel volk in de winkel",
  //     store: { connect: { name: "Carrefour" } },
  //   },
  // });
  // await prisma.expense.create({
  //   data: {
  //     date: new Date(),
  //     fullAmount: 63_000,
  //     paidAmount: 42_000,
  //     store: { connect: { name: "Carrefour" } },
  //   },
  // });
  // await prisma.expense.create({
  //   data: {
  //     date: new Date(),
  //     fullAmount: 10_100,
  //     paidAmount: 9_000,
  //     store: { connect: { name: "Carrefour" } },
  //   },
  // });
  // await prisma.expense.create({
  //   data: {
  //     date: new Date(),
  //     fullAmount: 22_950,
  //     paidAmount: 15_950,
  //     store: { connect: { name: "Bon Ap" } },
  //   },
  // });
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
