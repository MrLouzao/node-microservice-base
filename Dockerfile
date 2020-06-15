FROM node:11 as builder

WORKDIR /home/app

COPY ./index.js ./appBuild.js ./package.json /home/app/
COPY ./api /home/app/api
COPY ./config /home/app/config
COPY ./service /home/app/service
COPY ./utils /home/app/utils


ENTRYPOINT [ "node", "index.js" ]