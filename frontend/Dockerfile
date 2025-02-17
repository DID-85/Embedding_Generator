# Use Node.js as base image
FROM node:18

# Set working directory inside the container
WORKDIR /frontend

# Copy only package.json and package-lock.json first for caching
COPY template/package.json template/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend project (inside the template directory)
COPY template ./

# Build Remix app
RUN npm run build

# Expose Remix's default port
EXPOSE 3000

# Start the Remix app
CMD ["npm", "run", "dev"]
