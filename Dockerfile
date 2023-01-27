###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN yarn install

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

RUN yarn install --production=true && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine as production

ARG APP_PORT
ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE
ARG TWILIO_ACCOUNT_SID
ARG TWILIO_AUTH_TOKEN
ARG TWILIO_MESSAGING_SERVICE_SID
ARG REDIS_HOST
ARG REDIS_PORT
ARG REDIS_PASSWORD
ARG JWT_SECRET
ARG TYPEORM_LOGGING

ENV NODE_ENV=production
ENV APP_PORT=$APP_PORT
ENV DB_HOST=sendme-db
ENV DB_PORT=$DB_PORT
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_DATABASE=$DB_DATABASE
ENV TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID
ENV TWILIO_AUTH_TOKEN=$TWILIO_AUTH_TOKEN
ENV TWILIO_MESSAGING_SERVICE_SID=$TWILIO_MESSAGING_SERVICE_SID
ENV REDIS_HOST=sendme-cache
ENV REDIS_PORT=$REDIS_PORT
ENV REDIS_PASSWORD=$REDIS_PASSWORD
ENV JWT_SECRET=$JWT_SECRET
ENV TYPEORM_LOGGING=$TYPEORM_LOGGING

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package.json ./package.json

CMD [ "node", "./dist/src/main.js" ]
