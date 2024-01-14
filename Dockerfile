FROM node:latest
RUN apt-get update && apt-get upgrade -y
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY app/ /usr/src/app
EXPOSE 3000
CMD npm start