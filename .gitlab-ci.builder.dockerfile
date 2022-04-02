FROM node:16.14.0-alpine3.15

RUN apk update && apk upgrade && \
    apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.15/main/ docker bash bind-tools rsync zip git openssh-client curl jq
RUN set -e

RUN node -v
RUN npm -v
RUN yarn -v

RUN yarn global add renovate@31
