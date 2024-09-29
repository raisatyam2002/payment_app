FROM node:20.12.0-alpine3.19

WORKDIR app/user-app
copy package.json package-lock.json turbo.json  ./

COPY apps ./apps
COPY packages ./packages


RUN npm install

RUN cd packages/db && npx prisma generate  cd ../..

RUN cd apps/user-app && npm run build && cd ../..

CMD ["npm", "run", "start-user-app"]