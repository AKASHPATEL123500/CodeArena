FROM node:20.20.2-trixie-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 15000

CMD ["node", "src/index.js"]