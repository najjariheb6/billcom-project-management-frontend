# Stage 1: Build the Angular application
FROM node:10 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Angular application
RUN npm run build -- --prod

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the built Angular application from Stage 1
COPY --from=build /app/dist/erp-front-web /usr/share/nginx/html

# Copy custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 4200

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
