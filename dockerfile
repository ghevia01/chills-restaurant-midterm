# Stage 1: Build the React application
FROM node:16-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package.json package-lock.json ./

# Install project dependencies
# If you have native dependencies, you can't use `npm ci` without first copying
# over the necessary files. In that case, use `RUN npm install` instead.
RUN npm ci --only=production

# Copy the project files into the working directory
COPY . .

# Build the app for production to the build folder
RUN npm run build

# Stage 2: Serve the React application using serve
FROM node:16-alpine

# Install serve globally
RUN npm install -g serve

# Set the working directory to serve the build files
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build-stage /app/build .

# Serve the static files on port 8082
CMD ["serve", "-s", ".", "-l", "8082"]

# Expose port 8082 to the outside once the container has launched
EXPOSE 8082
