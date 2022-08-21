FROM node:18

RUN mkdir /cs-insights-frontend
WORKDIR /cs-insights-frontend
COPY ./ /cs-insights-frontend

WORKDIR /cs-insights-frontend
RUN npm install
RUN npm run build --omit=dev