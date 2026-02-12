FROM node:18-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install production dependencies with legacy peer deps support
RUN npm install --production --legacy-peer-deps

# Copy application code
COPY . .

EXPOSE 5000

# Start the application
CMD ["npm", "start"]
