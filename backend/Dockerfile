FROM node:18

# Working dir
WORKDIR /usr/src/app

# Copy package json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build
RUN npm run Build

# Expose the API port
EXPOSE 8090

# Run the application
CMD [ "node", "build/src/index.js" ]



