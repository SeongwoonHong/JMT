FROM node:10 as base

WORKDIR /app
COPY ./JMT-Backend /app

RUN npm install --no-optional
RUN node node_modules/.bin/tsc
RUN node node_modules/.bin/ef-tspm
RUN mkdir dist/src/logs
RUN touch dist/src/logs/errors.log

FROM node:10-alpine

WORKDIR /app
COPY --from=base /app /app

ENV PORT 8000
EXPOSE 8000

CMD ["npm", "start"]
