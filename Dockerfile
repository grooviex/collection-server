FROM ubuntu:latest
RUN apt-get update && apt-get install npm nodejs
WORKDIR /app
COPY . /app
COPY package.json /app
RUN npm install
COPY. /app
EXPOSE 3003
CMD ["node", "server.js"]