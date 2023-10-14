FROM --platform=linux/amd64 node:18

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

# Install serve
RUN npm install -g serve

# Expose the port
EXPOSE 3000

# Run the application
CMD ["serve", "-s", "build"]

