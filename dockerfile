# Stage 1: Build the React application
FROM node:16 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the project files into the working directory
COPY . .

# Build the app for production to the build folder
RUN npm run build:prod

# Stage 2: Serve the React application from Nginx
FROM nginx:stable-alpine as production-stage

# Copy the build output from the previous stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 8082

# Run Nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
