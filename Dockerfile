FROM node:18

RUN mkdir /frontend-server
WORKDIR /frontend-server
COPY ./ /frontend-server

RUN npm install
RUN npm install -g serve
RUN npm run build --omit=dev