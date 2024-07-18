FROM node:lts-alpine3.19 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/cooper_flow_web/browser/ usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
