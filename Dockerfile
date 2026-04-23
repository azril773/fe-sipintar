FROM node:25-alpine3.22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app/

RUN npm run build
RUN npm prune --production

FROM node:25-alpine3.22
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next /app/.next
COPY package*.json /app/
EXPOSE 3001
CMD ["npm", "start", "--", "-p", "3001"]