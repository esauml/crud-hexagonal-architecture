# Use the official Node.js 14 image
FROM node:14

# Set the working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port that the app is listening on
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
