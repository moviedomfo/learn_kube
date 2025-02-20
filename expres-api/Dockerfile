# BUILD STEP
FROM node:20.10.0-alpine AS build

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración necesarios
COPY package.json yarn.lock tsoa.json tsconfig.json ./
# Copiar el resto del proyecto (incluye src/ y mock/)
COPY . .

RUN yarn install --production=false 

# Construir la aplicación con .env.production
RUN yarn builddocker 

# Eliminar las devDependencies
# RUN yarn install --production=true
# CREATE IMAGE STEP
FROM node:20.10.0-alpine
LABEL maintainer="@moviedo"

WORKDIR /app

# copia los archivos compilados y node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/mock ./mock
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules

ADD ./.env.pre ./.env

CMD ["node", "dist/index.js"]






