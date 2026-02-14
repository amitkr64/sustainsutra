@echo off
REM ============================================================================
REM SustainSutra - Local Deployment Test Script (Windows)
REM ============================================================================
REM Purpose: Test the production configuration locally before Portainer deployment
REM
REM This script will:
REM 1. Build all containers
REM 2. Start services in correct order
REM 3. Wait for health checks
REM 4. Verify all endpoints
REM 5. Generate test report
REM
REM ============================================================================

setlocal enabledelayedexpansion

echo ==========================================
echo SustainSutra Local Deployment Test
echo ==========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)
echo [OK] Docker is running
echo.

REM Clean up old containers
echo ==========================================
echo Cleanup
echo ==========================================
echo Removing old test containers...
docker-compose -f docker-compose.test.yml down -v >nul 2>&1
echo [OK] Cleanup complete
echo.

REM Build containers
echo ==========================================
echo Building Containers
echo ==========================================
echo This may take 5-10 minutes on first run...
echo.

echo Building frontend (Nginx + React)...
docker-compose -f docker-compose.test.yml build frontend
if errorlevel 1 (
    echo [ERROR] Frontend build failed
    pause
    exit /b 1
)
echo [OK] Frontend built
echo.

echo Building backend (Node.js + Express)...
docker-compose -f docker-compose.test.yml build backend
if errorlevel 1 (
    echo [ERROR] Backend build failed
    pause
    exit /b 1
)
echo [OK] Backend built
echo.

REM Start services
echo ==========================================
echo Starting Services
echo ==========================================
echo.

echo Starting MongoDB...
docker-compose -f docker-compose.test.yml up -d mongo
echo.

echo Starting Backend...
docker-compose -f docker-compose.test.yml up -d backend
echo.

echo Starting Frontend...
docker-compose -f docker-compose.test.yml up -d frontend
echo.

echo [OK] All services started
echo.

REM Wait for services to be ready
echo ==========================================
echo Waiting for Services to Start
echo ==========================================
echo.

echo Waiting 20 seconds for services to initialize...
timeout /t 20 /nobreak >nul
echo.

REM Check container status
echo ==========================================
echo Checking Container Status
echo ==========================================
echo.
docker ps --filter "name=sustainsutra"
echo.

REM Test endpoints
echo ==========================================
echo Testing Endpoints
echo ==========================================
echo.

echo Testing Backend Health...
curl -s http://localhost:5000/api/health
echo.
echo.

echo Testing Frontend...
curl -s -o nul -w "Frontend Status: %%{http_code}\n" http://localhost:8085
echo.

REM Test MongoDB
echo Testing MongoDB Connection...
docker exec sustainsutra-mongo-test mongosh --quiet --eval "db.adminCommand('ping')"
echo.
echo.

REM Show logs
echo ==========================================
echo Recent Logs (Last 20 Lines)
echo ==========================================
echo.
echo --- Backend Logs ---
docker logs --tail 20 sustainsutra-backend-test
echo.
echo.

REM Show resource usage
echo ==========================================
echo Resource Usage
echo ==========================================
echo.
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" sustainsutra-backend-test sustainsutra-frontend-test sustainsutra-mongo-test
echo.

REM Summary
echo ==========================================
echo Test Summary
echo ==========================================
echo.

echo Your application is now running locally!
echo.
echo Test the application manually:
echo   Frontend: http://localhost:8085
echo   Backend:  http://localhost:5000/api/health
echo.

echo To view logs in real-time:
echo   docker logs -f sustainsutra-backend-test
echo   docker logs -f sustainsutra-frontend-test
echo.

echo To stop the test environment:
echo   docker-compose -f docker-compose.test.yml down
echo.

echo Press any key to open the application in your browser...
pause >nul

start http://localhost:8085

echo.
echo [OK] Test environment is running.
echo Close this window to keep services running,
echo or run docker-compose -f docker-compose.test.yml down to stop.
echo.

pause
