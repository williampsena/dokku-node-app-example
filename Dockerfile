FROM alpine:3.17 as build

WORKDIR /build

RUN apk add npm

COPY package.json package-lock.json /build/

RUN npm install --omit=dev

FROM node:lts-alpine as app

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY --from=build /build/node_modules node_modules
COPY ./src ./src

EXPOSE 80

CMD ["npm", "start"]