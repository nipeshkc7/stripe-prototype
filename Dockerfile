FROM node:14-alpine
ENV NODE_ENV=production
ARG BRANCH_NAME=branch
ARG COMMIT_SHA=commit_sha
WORKDIR /src
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD ["node" , "index.js"]

