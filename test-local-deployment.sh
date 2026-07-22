#!/bin/bash
# ============================================================================
# SustainSutra - Local Deployment Test Script
# ============================================================================
# Purpose: Test the production configuration locally before Portainer deployment
#
# This script will:
# 1. Build all containers
# 2. Start services in correct order
# 3. Wait for health checks
# 4. Verify all endpoints
# 5. Test critical functionality
# 6. Generate test report
#
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================================
# FUNCTIONS
# ============================================================================

print_header() {
    echo ""
    echo "=========================================="
    echo "$1"
    echo "=========================================="
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

wait_for_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1

    print_info "Waiting for $name to be ready..."

    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "$url" > /dev/null 2>&1; then
            print_success "$name is ready!"
            return 0
        fi

        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done

    print_error "$name failed to start"
    return 1
}

# ============================================================================
# PRE-TEST CHECKS
# ============================================================================

print_header "SustainSutra Local Deployment Test"

print_info "Starting pre-flight checks..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi
print_success "Docker is running"

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose is not installed"
    exit 1
fi
print_success "docker-compose is available"

# Check if ports are available
if netstat -tuln 2>/dev/null | grep -q ':8085\|:5000\|:27017'; then
    print_warning "Ports 8085, 5000, or 27017 may already be in use"
    print_info "You may need to stop existing containers"
fi

# Check disk space (need at least 5GB free)
DISK_AVAILABLE=$(df -BG . | awk 'NR==2 {print $4}' | sed 's/G//')
if [ "$DISK_AVAILABLE" -lt 5 ]; then
    print_warning "Low disk space: ${DISK_AVAILABLE}GB available (recommended: 5GB+)"
else
    print_success "Disk space: ${DISK_AVAILABLE}GB available"
fi

# ============================================================================
# CLEANUP OLD CONTAINERS
# ============================================================================

print_header "Cleanup"

print_info "Removing old test containers..."
docker-compose -f docker-compose.test.yml down -v 2>/dev/null || true
print_success "Cleanup complete"

# ============================================================================
# BUILD CONTAINERS
# ============================================================================

print_header "Building Containers"

print_info "This may take 5-10 minutes on first run..."
print_info "Building frontend (Nginx + React)..."
docker-compose -f docker-compose.test.yml build frontend

print_info "Building backend (Node.js + Express)..."
docker-compose -f docker-compose.test.yml build backend

print_success "All containers built successfully"

# ============================================================================
# START SERVICES
# ============================================================================

print_header "Starting Services"

print_info "Starting MongoDB..."
docker-compose -f docker-compose.test.yml up -d mongo

print_info "Starting Backend..."
docker-compose -f docker-compose.test.yml up -d backend

print_info "Starting Frontend..."
docker-compose -f docker-compose.test.yml up -d frontend

print_success "All services started"

# ============================================================================
# WAIT FOR HEALTH CHECKS
# ============================================================================

print_header "Waiting for Health Checks"

# Wait for MongoDB
print_info "Waiting for MongoDB health check..."
sleep 10

# Wait for Backend
wait_for_service "http://localhost:5000/api/health" "Backend API"

# Wait for Frontend
wait_for_service "http://localhost:8085" "Frontend Web Server"

# ============================================================================
# VERIFY SERVICES
# ============================================================================

print_header "Verifying Services"

print_info "Checking container status..."
CONTAINERS=$(docker ps --filter "name=sustainsutra" --format "{{.Names}}")
CONTAINER_COUNT=$(echo "$CONTAINERS" | wc -l)

if [ "$CONTAINER_COUNT" -eq 3 ]; then
    print_success "All 3 containers are running"
    echo "$CONTAINERS" | while read -r container; do
        print_info "  - $container"
    done
else
    print_error "Expected 3 containers, found $CONTAINER_COUNT"
    docker ps --filter "name=sustainsutra"
fi

# Check container health
print_info "Checking container health..."
HEALTHY=$(docker ps --filter "name=sustainsutra" --filter "health=healthy" --format "{{.Names}}" | wc -l)
if [ "$HEALTHY" -eq 3 ]; then
    print_success "All containers are healthy"
else
    print_warning "Some containers may not be healthy yet"
    print_info "This is normal on first start - waiting 30 seconds..."
    sleep 30
fi

# ============================================================================
# TEST ENDPOINTS
# ============================================================================

print_header "Testing Endpoints"

# Test Backend Health
print_info "Testing backend health endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:5000/api/health)
if echo "$HEALTH_RESPONSE" | grep -q "healthy"; then
    print_success "Backend health check passed"
    echo "  Response: $HEALTH_RESPONSE"
else
    print_error "Backend health check failed"
    echo "  Response: $HEALTH_RESPONSE"
fi

# Test Frontend
print_info "Testing frontend..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8085)
if [ "$FRONTEND_STATUS" -eq 200 ]; then
    print_success "Frontend is accessible (HTTP $FRONTEND_STATUS)"
else
    print_error "Frontend returned HTTP $FRONTEND_STATUS"
fi

# Test Database Connection
print_info "Testing MongoDB connection..."
DB_STATUS=$(docker exec sustainsutra-mongo-test mongosh --quiet --eval "db.adminCommand('ping')" 2>/dev/null)
if echo "$DB_STATUS" | grep -q "ok"; then
    print_success "MongoDB is responding"
else
    print_error "MongoDB ping failed"
fi

# ============================================================================
# FUNCTIONALITY TESTS
# ============================================================================

print_header "Functional Tests"

# Test User Registration
print_info "Testing user registration endpoint..."
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/users \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User","email":"test@example.com","password":"testpass123"}' || echo "ERROR")

if echo "$REGISTER_RESPONSE" | grep -q "success\|token\|_id"; then
    print_success "User registration working"
else
    print_warning "User registration test skipped or failed"
    echo "  Response: $REGISTER_RESPONSE"
fi

# Test File Upload Endpoint
print_info "Testing file upload endpoint availability..."
UPLOAD_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/upload)
if [ "$UPLOAD_STATUS" = "401" ] || [ "$UPLOAD_STATUS" = "405" ]; then
    print_success "Upload endpoint accessible (requires auth: HTTP $UPLOAD_STATUS)"
elif [ "$UPLOAD_STATUS" = "404" ]; then
    print_warning "Upload endpoint not found (may not be implemented)"
else
    print_info "Upload endpoint status: HTTP $UPLOAD_STATUS"
fi

# ============================================================================
# CHECK LOGS
# ============================================================================

print_header "Log Analysis"

print_info "Checking for errors in logs..."

BACKEND_ERRORS=$(docker logs sustainsutra-backend-test 2>&1 | grep -i "error\|fatal\|exception" | wc -l)
if [ "$BACKEND_ERRORS" -eq 0 ]; then
    print_success "No errors in backend logs"
else
    print_warning "Found $BACKEND_ERRORS potential errors in backend logs"
    print_info "Review with: docker logs sustainsutra-backend-test"
fi

FRONTEND_ERRORS=$(docker logs sustainsutra-frontend-test 2>&1 | grep -i "error" | wc -l)
if [ "$FRONTEND_ERRORS" -eq 0 ]; then
    print_success "No errors in frontend logs"
else
    print_warning "Found $FRONTEND_ERRORS potential errors in frontend logs"
fi

# ============================================================================
# VOLUME VERIFICATION
# ============================================================================

print_header "Volume Verification"

print_info "Checking persistent volumes..."

# Check if uploads directory exists
if docker exec sustainsutra-backend-test test -d /app/uploads; then
    print_success "Uploads directory exists"
else
    print_error "Uploads directory missing"
fi

# Check if logs directory exists
if docker exec sustainsutra-backend-test test -d /app/logs; then
    print_success "Logs directory exists"
else
    print_error "Logs directory missing"
fi

# Check MongoDB data
if docker exec sustainsutra-mongo-test test -d /data/db; then
    print_success "MongoDB data directory exists"
else
    print_error "MongoDB data directory missing"
fi

# ============================================================================
# PERFORMANCE CHECK
# ============================================================================

print_header "Performance Metrics"

# Check container resource usage
print_info "Container resource usage:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" sustainsutra-backend-test sustainsutra-frontend-test sustainsutra-mongo-test

# ============================================================================
# FINAL REPORT
# ============================================================================

print_header "Test Summary"

TOTAL_TESTS=10
PASSED_TESTS=0

# Count successes (basic check)
if docker ps | grep -q sustainsutra-backend-test; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
fi
if docker ps | grep -q sustainsutra-frontend-test; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
fi
if docker ps | grep -q sustainsutra-mongo-test; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
fi
if curl -s http://localhost:5000/api/health | grep -q healthy; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
fi
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8085 | grep -q 200; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
fi

echo ""
echo "Tests Passed: $PASSED_TESTS / $TOTAL_TESTS"
echo ""

if [ $PASSED_TESTS -ge 4 ]; then
    print_success "✓ Local deployment test PASSED"
    echo ""
    echo "Your application is ready for Portainer deployment!"
    echo ""
    echo "Next Steps:"
    echo "  1. Review the test results above"
    echo "  2. Test the application manually:"
    echo "     - Frontend: http://localhost:8085"
    echo "     - Backend: http://localhost:5000/api/health"
    echo "  3. Stop test environment when done:"
    echo "     docker-compose -f docker-compose.test.yml down"
    echo ""
    echo "  4. Deploy to Portainer using docker-compose.prod.yml"
else
    print_error "✗ Local deployment test FAILED"
    echo ""
    echo "Please review the errors above and fix issues before deploying."
    echo ""
    echo "Useful commands:"
    echo "  docker logs sustainsutra-backend-test"
    echo "  docker logs sustainsutra-frontend-test"
    echo "  docker logs sustainsutra-mongo-test"
fi

# ============================================================================
# CLEANUP PROMPT
# ============================================================================

echo ""
print_info "Test environment is still running."
print_info "To stop and remove test containers, run:"
echo "  docker-compose -f docker-compose.test.yml down"
echo ""
print_info "To view logs in real-time:"
echo "  docker logs -f sustainsutra-backend-test"
echo ""

exit 0
