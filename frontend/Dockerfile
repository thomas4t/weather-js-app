# this is only variable
ARG BARE_IMAGE=node:16.13.0-alpine
# fill in your prebuilt base image
ARG BASE_IMAGE=base

############
## base
###########
FROM ${BARE_IMAGE} as base

# Step 1: Install dev tools
# workaround for Error: could not get uid/gid
RUN apk update && apk upgrade && \
    apk add jq && \
    npm config set unsafe-perm true


############
## dev
###########
FROM ${BASE_IMAGE} as build

WORKDIR /app

# this will cache dependencies in docker layer against the specific version of the dep files
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn check --integrity
RUN du -sh node_modules

# place proper version to package.json
ARG APP_VERSION_SEMANTIC
RUN jq --arg APP_VERSION_SEMANTIC "$APP_VERSION_SEMANTIC" '.version = $APP_VERSION_SEMANTIC' package.json > package.json.temp && mv package.json.temp package.json

# copy the rest of the app, test it
COPY . .
RUN yarn lint
RUN yarn test

# build the app
RUN yarn run build

# drops dev dependencies from node_modules
RUN yarn install --production --silent 
RUN du -sh node_modules


############
## app
###########
FROM ${BARE_IMAGE} as app

WORKDIR /app

# ENV DEBUG=*

# Step 2: Copy already built application
COPY . .
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=build /app/node_modules /app/node_modules

# Step 3: Expose and run
EXPOSE ${FRONTEND__PORT:-3000}
CMD ["yarn", "start:prod"]

