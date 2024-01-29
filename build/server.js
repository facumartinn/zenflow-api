import { PrismaClient } from '@prisma/client';
import createApp from './app.js';
const prisma = new PrismaClient();
const app = createApp(prisma);
const PORT = (process.env.PORT != null) || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
