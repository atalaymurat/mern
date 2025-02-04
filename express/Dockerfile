FROM node:23

WORKDIR /app

RUN npm install -g nodemon

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

