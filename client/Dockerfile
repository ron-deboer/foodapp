FROM node:14-alpine as base

RUN apk update && apk add --no-cache nano

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV CLIENT_PORT "3006"

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "start"]