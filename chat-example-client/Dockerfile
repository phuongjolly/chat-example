# Use Node image for building
FROM node:18 as build

# Set working directory
WORKDIR /app

# Install dependencies and build app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve the build with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config (optional)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
