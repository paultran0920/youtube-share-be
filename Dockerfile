FROM node:18

WORKDIR /usr/app
COPY package*.json ./
RUN yarn
COPY . .

# All docker will expose 8080, will re-map it late in nginx
EXPOSE 8080
CMD [ "yarn", "start" ]
