FROM node:18.17.1
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 3002
CMD ["npm", "run", "dev"]