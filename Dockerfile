FROM node:20.12.0-alpine3.19

WORKDIR app/bank_webhook
copy package.json package-lock.json turbo.json  ./

COPY apps ./apps
COPY packages ./packages

RUN npm install
RUN cd packages/db && npx prisma generate  cd ../..
RUN cd apps/bank_webhook && npm run build && cd ../..
CMD ["npm", "run", "start-bank-webhook"]