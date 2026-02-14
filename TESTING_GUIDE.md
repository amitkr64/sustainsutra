# 🧪 Local Testing Guide - SustainSutra

## 📋 Overview

This guide will help you test the production Docker configuration locally before deploying to Portainer. This validates that everything works correctly and helps identify any issues early.

---

## 🎯 Why Test Locally?

✅ **Validate Configuration**: Ensure docker-compose.yml syntax is correct
✅ **Test All Services**: Verify frontend, backend, and database work together
✅ **Debug Issues**: Fix problems in a safe local environment
✅ **Performance Check**: Monitor resource usage and startup times
✅ **Functionality Test**: Verify all features work as expected

---

## ⚡ Quick Start (Windows)

### Automated Test (Recommended)

1. **Open PowerShell or Command Prompt** as Administrator
2. **Navigate to project directory**:
   ```cmd
   cd D:\Application_Dev\SustainSutra
   ```

3. **Run the automated test script**:
   ```cmd
   test-local-deployment.bat
   ```

4. **Wait for the test to complete** (~10-15 minutes)
   - Script will build all containers
   - Start all services
   - Run health checks
   - Generate test report

5. **Review the results**:
   - ✅ All tests passed → Ready for Portainer
   - ❌ Tests failed → Review errors and fix

### Manual Test

If you prefer manual testing:

```cmd
REM Build containers
docker-compose -f docker-compose.test.yml build

REM Start services
docker-compose -f docker-compose.test.yml up -d

REM Check status
docker-compose -f docker-compose.test.yml ps

REM View logs
docker-compose -f docker-compose.test.yml logs -f
```

---

## ⚡ Quick Start (Linux/Mac)

### Automated Test

```bash
# Make script executable
chmod +x test-local-deployment.sh

# Run the test
./test-local-deployment.sh
```

### Manual Test

```bash
# Build containers
docker-compose -f docker-compose.test.yml build

# Start services
docker-compose -f docker-compose.test.yml up -d

# Check status
docker-compose -f docker-compose.test.yml ps

# View logs
docker-compose -f docker-compose.test.yml logs -f
```

---

## 🧪 Testing Checklist

### 1. Container Startup

**Test**: All 3 containers start successfully

```bash
docker ps | grep sustainsutra
```

**Expected Output**:
```
sustainsutra-frontend-test
sustainsutra-backend-test
sustainsutra-mongo-test
```

**Status**: ☐ Passed

---

### 2. Health Checks

**Test**: All containers pass health checks

```bash
# Wait 30 seconds, then check
docker ps --filter "name=sustainsutra" --format "table {{.Names}}\t{{.Status}}"
```

**Expected**: All show "healthy"

**Status**: ☐ Passed

---

### 3. Frontend Access

**Test**: Open frontend in browser

- URL: http://localhost:8085
- Expected: SustainSutra homepage loads

**Status**: ☐ Passed

---

### 4. Backend API Health

**Test**: Backend health endpoint responds

```bash
curl http://localhost:5000/api/health
```

**Expected Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-XX-XX",
  "demoMode": false,
  "database": "connected"
}
```

**Status**: ☐ Passed

---

### 5. Database Connectivity

**Test**: MongoDB is accessible

```bash
docker exec sustainsutra-mongo-test mongosh --eval "db.adminCommand('ping')"
```

**Expected**: `{ ok: 1 }`

**Status**: ☐ Passed

---

### 6. User Registration

**Test**: Create a new user account

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"testpass123"}'
```

**Expected**: Success response with user object or token

**Status**: ☐ Passed

---

### 7. User Login

**Test**: Login with registered user

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

**Expected**: Success response with JWT token

**Status**: ☐ Passed

---

### 8. File Upload

**Test**: Upload a test file

```bash
# Create test file
echo "Test file content" > test.txt

# Upload (you'll need the JWT token from login above)
curl -X POST http://localhost:5000/api/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@test.txt"
```

**Expected**: File uploaded successfully

**Status**: ☐ Passed

---

### 9. Volume Persistence

**Test**: Data persists after container restart

```bash
# Restart backend container
docker restart sustainsutra-backend-test

# Wait for restart, then try login again
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

**Expected**: Login still works (data persisted)

**Status**: ☐ Passed

---

### 10. Resource Usage

**Test**: Check resource consumption

```bash
docker stats sustainsutra-backend-test sustainsutra-frontend-test sustainsutra-mongo-test --no-stream
```

**Expected**:
- Frontend: < 200MB RAM
- Backend: < 500MB RAM
- MongoDB: < 500MB RAM

**Status**: ☐ Passed

---

## 🐛 Common Issues & Fixes

### Issue: Port Already in Use

**Error**:
```
Error: bind: address already in use
```

**Fix**:
```bash
# Find process using the port
netstat -tuln | grep :8085
# or
lsof -i :8085

# Stop the conflicting service or change port in docker-compose.test.yml
```

---

### Issue: Container Won't Start

**Symptoms**: Container exits immediately

**Fix**:
```bash
# Check container logs
docker logs sustainsutra-backend-test

# Common causes:
# 1. Missing dependencies - check Dockerfile
# 2. Environment variables - verify .env file
# 3. Volume permissions - check host directory permissions
```

---

### Issue: Database Connection Failed

**Error**:
```
MongoServerError: Authentication failed
```

**Fix**:
- The test configuration doesn't use authentication
- Check MongoDB is healthy:
  ```bash
  docker exec sustainsutra-mongo-test mongosh
  ```

---

### Issue: Frontend Can't Reach Backend

**Error**: Browser shows "Network Error" or API calls fail

**Fix**:
- Verify both containers are on same network:
  ```bash
  docker network inspect sustainsutra-test-network
  ```
- Check frontend environment variable:
  ```bash
  docker exec sustainsutra-frontend-test env | grep API_URL
  ```
- Should show: `VITE_API_URL=http://localhost:5000`

---

### Issue: Health Check Timeout

**Symptoms**: Container status shows "starting" for too long

**Fix**:
```bash
# Manual health check
docker exec sustainsutra-backend-test wget -O- http://localhost:5000/api/health

# If failing, check application logs:
docker logs sustainsutra-backend-test --tail 100
```

---

## 📊 Interpreting Test Results

### ✅ All Tests Passed

Congratulations! Your configuration is ready for Portainer.

**Next Steps**:
1. ✅ Deploy to Portainer using `docker-compose.prod.yml`
2. ✅ Configure production secrets
3. ✅ Set up SSL/TLS (recommended)
4. ✅ Configure monitoring

### ⚠️ Some Tests Failed

Don't worry! Review the failures:

**Container Won't Start**:
- Check logs: `docker logs container-name`
- Verify Dockerfile syntax
- Check build errors

**Database Issues**:
- Verify MongoDB container is healthy
- Check connection string
- Review backend environment variables

**API Errors**:
- Check backend logs
- Verify CORS configuration
- Test endpoints manually with curl

**Resource Issues**:
- Close other applications
- Increase Docker resource limits in Docker Desktop
- Reduce container resource limits

---

## 🔄 Testing Workflow

```
┌─────────────────────────────────────┐
│ 1. Build Containers                │
│    docker-compose build            │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 2. Start Services                  │
│    docker-compose up -d           │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 3. Verify Health                  │
│    docker ps                      │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 4. Test Endpoints                 │
│    - Frontend:8085                │
│    - Backend:5000                 │
│    - Database:27017               │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 5. Functional Tests                │
│    - User registration             │
│    - Login                        │
│    - File uploads                 │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 6. Resource Check                 │
│    docker stats                   │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 7. Cleanup                        │
│    docker-compose down -v          │
└─────────────────────────────────────┘
```

---

## 📝 Test Report Template

Use this template to document your test results:

```markdown
## SustainSutra Local Test Report

**Date**: ___________
**Tester**: ___________
**Environment**:
- OS: ___________
- Docker Version: ___________
- Docker Compose Version: ___________

### Test Results

| Test | Status | Notes |
|------|--------|-------|
| Container Startup | ☐ Pass ☐ Fail | |
| Health Checks | ☐ Pass ☐ Fail | |
| Frontend Access | ☐ Pass ☐ Fail | |
| Backend API | ☐ Pass ☐ Fail | |
| Database Connectivity | ☐ Pass ☐ Fail | |
| User Registration | ☐ Pass ☐ Fail | |
| User Login | ☐ Pass ☐ Fail | |
| File Upload | ☐ Pass ☐ Fail | |
| Volume Persistence | ☐ Pass ☐ Fail | |
| Resource Usage | ☐ Pass ☐ Fail | |

### Issues Found

1.
2.
3.

### Resource Usage

- Frontend RAM: _________
- Backend RAM: _________
- MongoDB RAM: _________

### Conclusion

☐ Ready for Portainer deployment
☐ Needs fixes before deployment

### Next Steps

1.
2.
3.
```

---

## 🚀 Ready for Deployment?

Once all tests pass:

1. **Stop test environment**:
   ```bash
   docker-compose -f docker-compose.test.yml down -v
   ```

2. **Deploy to Portainer**:
   - Follow `PORTAINER_DEPLOYMENT_GUIDE.md`
   - Use `docker-compose.prod.yml`
   - Configure production secrets

3. **Verify production deployment**:
   - Check all services are healthy
   - Test critical functionality
   - Monitor for 24 hours

---

## 📞 Need Help?

- **Full Deployment Guide**: `PORTAINER_DEPLOYMENT_GUIDE.md`
- **Quick Reference**: `PORTAINER_QUICK_REFERENCE.md`
- **Application Support**: info@sustainsutra.in

**Happy Testing!** 🧪
