FROM alpine:3.17 as build

WORKDIR /build

RUN apk add npm

COPY package.json package-lock.json /build/

RUN npm install --production

FROM node:lts-alpine as app

WORKDIR /app

COPY --from=build /build/package.json /build/package-lock.json ./
COPY --from=build /build/node_modules node_modules
COPY ./src ./src

CMD ["npm", "start"]


