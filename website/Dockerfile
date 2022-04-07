FROM node:12.18.1

WORKDIR /app

COPY ["./covid-19-website/package.json", "./covid-19-website/package-lock.json*", "/app/"]

RUN npm install

COPY ./covid-19-website/src/backend /app

CMD [ "node", "index" ]
