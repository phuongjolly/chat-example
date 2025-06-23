
# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 8080

# Run the server
CMD ["node", "index.js"]
