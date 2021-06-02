FROM node:14-alpine3.13

WORKDIR /service

COPY package*.json .

RUN npm install 

COPY . .

EXPOSE 3006

CMD ["npm", "start"]
