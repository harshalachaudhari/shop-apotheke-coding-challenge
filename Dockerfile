FROM node:16

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
ENV PORT 3000
#ARG DOCKER_ENV
#ENV NODE_ENV=${DOCKER_ENV}
#RUN if [ "$DOCKER_ENV" = "stag" ] ; then  echo   your NODE_ENV for stage is $NODE_ENV;  \
#else  echo your NODE_ENV for dev is $NODE_ENV; \
#fi 

EXPOSE ${PORT}

CMD [ "npm","run", "start:dev" ]