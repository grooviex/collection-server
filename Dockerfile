# INSTALL SYSTEM && RUN UPDATES
FROM node:latest
RUN apt-get update && apt-get upgrade -y && apt-get install netcat-traditional

# ENV CONFIGURATION
ENV DOCKER true
ENV NODE_ENV production

# INSTALL PROJECT

WORKDIR /usr/src/app
COPY collection/* /usr/src/app/collection/
COPY package.json entrypoint.sh /usr/src/app/
RUN npm install

COPY ./src /usr/src/app

# START PROJECT
EXPOSE 3000
RUN chmod +x entrypoint.sh
ENTRYPOINT "./entrypoint.sh"