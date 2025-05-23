FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm ci

CMD [ "npm", "run", "serve" ]