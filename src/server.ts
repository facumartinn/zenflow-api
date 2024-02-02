import { PrismaClient } from '@prisma/client'
import createApp from './app'

const prisma = new PrismaClient()
const app = createApp(prisma)

const PORT = (process.env.PORT != null) || 3000
app.listen(PORT, () => {
  console.log(`Express server is listening at http://localhost:${PORT} 🚀`)
})
