#Build Environment
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

# Production Environment
FROM nginx:1.25.2-alpine

# Copy Build
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose 80 port
EXPOSE 80

# Run Nginx as foreground process in container
CMD ["nginx", "-g", "daemon off;"]

