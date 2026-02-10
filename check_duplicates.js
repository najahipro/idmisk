
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDuplicates() {
    const sizes = await prisma.size.findMany();
    const names = sizes.map(s => s.name);
    const duplicates = names.filter((item, index) => names.indexOf(item) !== index);

    if (duplicates.length > 0) {
        console.log("Found duplicate sizes:", duplicates);
        console.log("Please resolve duplicates before adding @unique constraint.");
    } else {
        console.log("No duplicate sizes found. Safe to add @unique.");
    }
}

checkDuplicates()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
