FROM node:10.16.3-alpine

WORKDIR /usr/src/app

ENV SERVER_PORT 80

COPY . ./

RUN npm install
RUN npm install react-scripts -g
RUN npm run build

CMD ["node", "server.js"]