FROM node:16-alpine

RUN apk add --no-cache curl

WORKDIR /app

HEALTHCHECK --interval=5s --timeout=5s --start-period=1s CMD curl --fail http://127.0.0.1:4004/health || exit 1
