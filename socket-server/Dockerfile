FROM node:14-alpine3.13

WORKDIR /socket

COPY package*.json .

RUN npm install 

COPY . .

EXPOSE 3005

CMD ["npm", "start"]
