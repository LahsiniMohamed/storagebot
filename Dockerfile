FROM node:latest as build

WORKDIR /app

COPY package.json /app/package.json
RUN npm install
COPY . /app

EXPOSE 8080
CMD [ "node", "index.js" ]