FROM node:18

RUN mkdir /frontend-server
WORKDIR /frontend-server
COPY ./ /frontend-server

ENV NODE_ENV=production
RUN npm install --omit=dev
RUN npm install -g serve
RUN npm run build --omit=dev