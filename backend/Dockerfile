FROM node:20.9.0-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose the application's port
EXPOSE 3000

# Use a single CMD to ensure the migration runs first
CMD npm run migrate && npm run dev
