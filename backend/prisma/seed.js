import prisma from "../src/config/prisma.js";

async function main() {
  await prisma.role.createMany({
    data: [
      { roleName: "viewer" },
      { roleName: "analyst" },
      { roleName: "admin" }
    ],
    skipDuplicates: true
  });

  console.log("Default roles seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });