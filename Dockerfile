# Dockerfile
# Etapa 1: Construir a aplicação Angular
FROM node:16 AS angular
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: Servir os arquivos estáticos com Nginx
FROM nginx:alpine
COPY --from=build /app/dist/cooper_flow_web /usr/share/nginx/html
EXPOSE 4200
