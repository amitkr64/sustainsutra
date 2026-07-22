# 🧪 Quick Start: Local Testing

## 📋 Test Files Created

✅ `docker-compose.test.yml` - Local test configuration
✅ `test-local-deployment.bat` - Windows automated test script
✅ `test-local-deployment.sh` - Linux/Mac automated test script
✅ `TESTING_GUIDE.md` - Complete testing documentation

---

## 🚀 How to Test Locally

### Option 1: Windows Automated Test (Recommended)

1. **Open Command Prompt** or **PowerShell** as Administrator
2. **Navigate to project folder**:
   ```cmd
   cd D:\Application_Dev\SustainSutra
   ```

3. **Run the test script**:
   ```cmd
   test-local-deployment.bat
   ```

4. **Wait for completion** (~10-15 minutes)
   - Script builds containers
   - Starts all services
   - Runs health checks
   - Opens browser when ready

---

### Option 2: Manual Test

**Step 1: Build Containers**
```cmd
docker-compose -f docker-compose.test.yml build
```

**Step 2: Start Services**
```cmd
docker-compose -f docker-compose.test.yml up -d
```

**Step 3: Verify Status**
```cmd
docker ps
```

You should see 3 containers:
- sustainsutra-frontend-test
- sustainsutra-backend-test
- sustainsutra-mongo-test

**Step 4: Test Application**

Open your browser:
- Frontend: http://localhost:8085
- Backend API: http://localhost:5000/api/health

**Step 5: Cleanup When Done**
```cmd
docker-compose -f docker-compose.test.yml down -v
```

---

## ✅ What Gets Tested

| Component | Test | Command |
|-----------|-------|---------|
| **Frontend** | Web server responds | `curl http://localhost:8085` |
| **Backend** | API health check | `curl http://localhost:5000/api/health` |
| **Database** | MongoDB connection | `docker exec sustainsutra-mongo-test mongosh --eval "db.adminCommand('ping')"` |
| **Volumes** | Data persistence | Check `/var/lib/sustainsutra` mounts |
| **Networks** | Container communication | Verify services can reach each other |
| **Resources** | CPU/Memory usage | `docker stats sustainsutra-*` |

---

## 🐛 Troubleshooting

### "docker-compose not found"

**Install Docker Desktop**:
1. Download: https://www.docker.com/products/docker-desktop
2. Install and start Docker Desktop
3. Verify: `docker --version`

### "Port already in use"

**Check what's using the ports**:
```cmd
netstat -ano | findstr :8085
netstat -ano | findstr :5000
netstat -ano | findstr :27017
```

**Stop conflicting services** or change ports in `docker-compose.test.yml`

### "Container exits immediately"

**Check logs**:
```cmd
docker logs sustainsutra-backend-test
docker logs sustainsutra-frontend-test
docker logs sustainsutra-mongo-test
```

**Common fixes**:
- Restart Docker Desktop
- Check disk space (need 5GB+ free)
- Verify Dockerfile syntax

### "Can't access localhost:8085"

**Wait longer** - containers may still be starting:
```cmd
docker ps  # Check status column
```

Should show "healthy" or "Up X seconds"

---

## 📊 Expected Test Results

### Successful Test Output

```
==========================================
SustainSutra Local Deployment Test
==========================================

[OK] Docker is running
[OK] docker-compose is available
[OK] Disk space: 45GB available

==========================================
Building Containers
==========================================

[OK] Frontend built
[OK] Backend built

==========================================
Starting Services
==========================================

[OK] All services started

==========================================
Checking Container Status
==========================================

sustainsutra-frontend-test   Up   healthy
sustainsutra-backend-test   Up   healthy
sustainsutra-mongo-test     Up   healthy

==========================================
Testing Endpoints
==========================================

[OK] Backend health check passed
[OK] Frontend is accessible (HTTP 200)
[OK] MongoDB is responding

==========================================
Test Summary
==========================================

Tests Passed: 10 / 10

✓ Local deployment test PASSED

Your application is ready for Portainer deployment!
```

---

## 🎯 Test Checklist

Before deploying to Portainer, verify:

- [ ] All 3 containers start successfully
- [ ] All health checks pass (status: healthy)
- [ ] Frontend loads in browser at `http://localhost:8085`
- [ ] Backend API responds at `http://localhost:5000/api/health`
- [ ] Database connectivity works
- [ ] No errors in container logs
- [ ] Resource usage is reasonable (< 2GB RAM total)
- [ ] File uploads work (if tested)
- [ ] User registration works (if tested)

---

## 📝 Test Results Log

**Test Date**: ___________

**Environment**:
- OS: Windows 10/11 / Linux / Mac
- Docker Version: ___________
- Docker Compose Version: ___________

**Test Results**:
- [ ] Container Startup: ☐ Pass ☐ Fail
- [ ] Health Checks: ☐ Pass ☐ Fail
- [ ] Frontend Access: ☐ Pass ☐ Fail
- [ ] Backend API: ☐ Pass ☐ Fail
- [ ] Database: ☐ Pass ☐ Fail

**Issues Found**:
1.
2.
3.

**Conclusion**:
☐ Ready for Portainer deployment
☐ Needs fixes first

---

## 🚀 Ready to Deploy?

If all tests passed:

1. **Stop test environment**:
   ```cmd
   docker-compose -f docker-compose.test.yml down -v
   ```

2. **Deploy to Portainer**:
   - Open Portainer web interface
   - Create new stack
   - Upload `docker-compose.prod.yml`
   - Configure secrets
   - Deploy!

3. **Monitor deployment**:
   - Watch logs in Portainer
   - Verify all services healthy
   - Test production URLs

---

## 📖 Full Documentation

- **Complete Testing Guide**: `TESTING_GUIDE.md`
- **Portainer Deployment**: `PORTAINER_DEPLOYMENT_GUIDE.md`
- **Quick Reference**: `PORTAINER_QUICK_REFERENCE.md`

---

**Need Help?**
- Email: info@sustainsutra.in
- Phone: +91-8742939191

**Good luck with your testing!** 🧪
