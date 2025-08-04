FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["sh", "-c", "npm run db:deploy && npm run start:prod"]