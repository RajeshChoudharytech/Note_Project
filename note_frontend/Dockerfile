
FROM node:16

WORKDIR /app


COPY package.json package-lock.json ./
CMD npm install


COPY . .

CMD ["npm", "start"]

EXPOSE 3000
