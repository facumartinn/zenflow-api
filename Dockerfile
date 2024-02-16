# Utiliza la imagen base oficial de Node.js con una etiqueta específica de versión de Node como '14-alpine'
FROM node:18.16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el 'package.json' y 'package-lock.json' (si está disponible)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Instalar Prisma CLI para poder ejecutar prisma generate
RUN npm install @prisma/client prisma

# Copia los archivos de Prisma al contenedor
COPY prisma ./prisma/

# Genera el cliente de Prisma
RUN npx prisma generate

# Si estás usando TypeScript, copia tus archivos fuente y de configuración de TypeScript
COPY . .

# Compila la aplicación TypeScript a JavaScript
# RUN npm run build

# Expone el puerto que tu aplicación utilizará
EXPOSE 3000

# El comando para ejecutar tu aplicación
CMD ["node", "build/server.js"]

# Set the environment variable
ENV DATABASE_URL="mysql://root@localhost:3306/matrix"