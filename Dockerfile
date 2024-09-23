FROM node:20.12.0-alpine3.19

WORKDIR app/user-app
copy package.json package-lock.json turbo.json  ./

COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install
# Can you add a script to the global package.json that does this?
RUN cd packages/db && npx prisma generate  cd ../..

RUN npm run build

CMD ["npm", "run", "start-user-app"]