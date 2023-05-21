FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

# Build
CMD ["npm", "run", "build"]

# Expose port
EXPOSE 3000
CMD ["npm", "start"]