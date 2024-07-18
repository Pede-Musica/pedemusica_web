FROM node:lts-alpine3.19 as angular

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM httpd:alpine3.20

WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/cooper_flow_web .

EXPOSE 4200
