FROM node:18.14.2-alpine as builder

WORKDIR /var/source
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build


FROM node:18.14.2-alpine
WORKDIR /var/source
COPY --from=builder /var/source/node_modules node_modules
COPY --from=builder /var/source/dist ./dist
COPY --from=builder /var/source/package.json ./

EXPOSE 80
CMD [ "npm", "run", "start:prod" ]