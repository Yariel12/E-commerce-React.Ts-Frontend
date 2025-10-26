FROM node:18 AS build
WORKDIR /app

# Copiar package.json y instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código
COPY . .

# Definir la variable de entorno para Vite
ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=$VITE_API_URL

# Build con la variable de entorno
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]