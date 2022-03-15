FROM node:12


WORKDIR /covid-19-website

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .
#copy



EXPOSE 8080

CMD [ "npm", "run", "serve"]