FROM node:current-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build:prod

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN rm -rf /etc/nginx/conf.d/*

COPY --from=build /app/dist/daxa/browser /usr/share/nginx/html

COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
