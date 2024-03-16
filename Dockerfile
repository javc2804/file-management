# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the .env and .env.local files to the working directory
COPY .env ./
COPY .env.local ./

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the application
CMD [ "npm", "start" ]