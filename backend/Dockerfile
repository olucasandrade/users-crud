FROM node:lts

WORKDIR /usr/src

RUN apt-get -qy update && apt-get -qy install openssl netcat-traditional

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma/ ./prisma/
COPY src/ ./src/

RUN npm install

RUN rm -rf node_modules/.prisma

RUN npx prisma generate

RUN npm run build

EXPOSE 4001

CMD npm run start