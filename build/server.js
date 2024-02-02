import { PrismaClient } from '@prisma/client';
import createApp from './app.js';
var prisma = new PrismaClient();
var app = createApp(prisma);
var PORT = (process.env.PORT != null) || 3000;
app.listen(PORT, function () {
    console.log("Express server is listening at http://localhost:".concat(PORT, " \uD83D\uDE80"));
});
