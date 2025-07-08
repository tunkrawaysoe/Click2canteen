const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.restaurant.deleteMany(); // clear table (optional)

  await prisma.restaurant.createMany({
    data: [
      {
        name: "Taste Myanmar",
        phone: "09-123456789",
        address: "123 Yangon Street",
        imageUrl: "https://example.com/restaurant1.jpg",
        isOpen: true,
        isActive: true,
      },
      {
        name: "Canteen Delight",
        phone: "09-987654321",
        address: "456 Mandalay Road",
        imageUrl: null,
        isOpen: false,
        isActive: true,
      },
    ],
  });

  console.log("Restaurants seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
