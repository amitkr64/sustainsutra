# Multi-stage build for SustainSutra frontend

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source and build.
# BASE_PATH=/ serves the app at the domain ROOT (Docker/nginx deployments).
# Override with --build-arg BASE_PATH=/repo-name/ for GitHub Pages-style
# subpath hosting.
COPY . .
ARG BASE_PATH=/
ENV BASE_PATH=${BASE_PATH}
RUN npm run build

# Stage 2: Production with nginx
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
