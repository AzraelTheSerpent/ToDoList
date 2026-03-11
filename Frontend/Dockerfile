FROM node:alpine as BUILD

COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=BUILD /dist /usr/share/nginx/html
COPY --from=BUILD nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]