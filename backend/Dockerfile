FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

# Bundle app source
COPY . .

#Build the app
CMD ["npm", "run", "build"]

CMD ["npm", "start"]