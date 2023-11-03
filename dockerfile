# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# If you're using yarn, copy yarn.lock as well
# COPY yarn.lock ./

# Install any needed packages specified in package.json
RUN npm install

# If you're using yarn, run yarn install instead
# RUN yarn install

# Bundle the app source inside the Docker image
COPY . .

# Make port 8082 available to the world outside this container
EXPOSE 8082

# Define environment variable for the development server port
ENV PORT=8082
ENV NODE_ENV=development

# Run npm start when the container launches
CMD ["npm", "start"]
