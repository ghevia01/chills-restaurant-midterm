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

# Expose port 8082 to the outside once the container has launched
EXPOSE 8082

# Create a new default.conf file for Nginx to listen on the desired port
RUN echo $'server {\n\
    listen 8082;\n\
    location / {\n\
        root   /usr/share/nginx/html;\n\
        index  index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    error_page   500 502 503 504  /50x.html;\n\
    location = /50x.html {\n\
        root   /usr/share/nginx/html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

# Run Nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
