# SustainSutra Backend Dockerfile
#
# Build context is the REPOSITORY ROOT (so this Dockerfile can COPY shared
# files if ever needed). We therefore WORKDIR into /app/backend and copy the
# backend subtree there. The backend's own package.json (which defines the
# "start" script) lives in backend/.

FROM node:18-alpine

# Backend app lives here
WORKDIR /app/backend

# Install curl for health checks
RUN apk add --no-cache curl

# Copy backend package files first (for layer caching)
COPY backend/package*.json ./

# Install dependencies
RUN npm install --production --legacy-peer-deps

# Copy the backend application code
COPY backend/ ./

EXPOSE 5000

# Start the application (npm start -> node server.js, defined in backend/package.json)
CMD ["npm", "start"]
