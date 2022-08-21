FROM node:18 as builder

RUN mkdir /cs-insights-frontend
WORKDIR /cs-insights-frontend
COPY ./ /cs-insights-frontend

WORKDIR /cs-insights-frontend
RUN npm install
RUN npm run build --omit=dev

FROM nginx:latest

COPY --from=builder /cs-insights-frontend/build /usr/share/nginx/html/
COPY --from=builder /cs-insights-frontend/nginx.conf /etc/nginx/conf.d/default.conf