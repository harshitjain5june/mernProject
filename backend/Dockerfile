# Build stage
FROM --platform=linux/amd64 node:18 as build

# Working dir
WORKDIR /usr/src/app

# Copy package json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build
RUN npm run build


# Production stage
FROM node:20-alpine3.17

# Working dir
WORKDIR /usr/src/app

# Copy package.json
COPY --from=build /usr/src/app/package*.json ./ 

# Install dependencies
RUN npm install

# Copy Build
COPY --from=build /usr/src/app/build ./build

# Expose 8090 Port
EXPOSE 8090

# Run 
CMD [ "node", "build/src/index.js" ]



