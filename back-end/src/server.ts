import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Menangani penutupan server
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});