# Stage 2: Serve the React application with Node.js
FROM node:16 as production-stage

# Set the working directory
WORKDIR /app

# Install serve package globally to serve static files
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/build /app/build

# Expose the desired port
EXPOSE 8082

# Command to serve the build folder on port 8082
CMD ["serve", "-s", "build", "-l", "8082"]
