FROM node:18 as builder

RUN mkdir /frontend-server
WORKDIR /frontend-server
COPY ./ /frontend-server

RUN npm install
RUN npm run build --omit=dev


FROM nginx:latest

COPY --from=builder /frontend-server/build /usr/share/nginx/html/
COPY --from=builder /frontend-server/nginx.conf /etc/nginx/conf.d/default.conf
