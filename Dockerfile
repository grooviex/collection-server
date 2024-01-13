FROM node:latest
ARG DOCKER
RUN apt-get update && apt-get upgrade -y
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 3003
CMD npm start