FROM node:lts-alpine3.19 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:prod

FROM nginx:alpine
COPY --from=builder /app/dist/cooper_flow_web/browser /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 4250

CMD ["nginx", "-g", "daemon off;"]
