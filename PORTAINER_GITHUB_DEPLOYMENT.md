# 🚀 Portainer Deployment Guide - GitHub Repository Method

## ✅ Ready to Deploy

All fixes are applied and pushed to GitHub. You can now deploy directly from GitHub!

---

## 📋 Pre-Deployment Checklist

### ✅ Completed (Automatically)
- [x] Backend package.json typos fixed (helmet, multer, nodemailer, pdfkit, winston, nodemon)
- [x] Dockerfiles verified correct
- [x] docker-compose.prod.yml updated to build from GitHub
- [x] All configuration files on GitHub

### ⏳ You Need to Do (Before Deploying)

#### 1. Create Docker Secrets in Portainer

Go to: **Portainer → Secrets**

Create these secrets:

| Secret Name | Value | How to Generate |
|-------------|-------|-----------------|
| `sustainsutra_jwt_secret` | Generate with: `openssl rand -base64 64` | ⚠️ 64 characters min |
| `sustainsutra_mongo_username` | `admin` | - |
| `sustainsutra_mongo_password` | Generate with: `openssl rand -base64 32` | ⚠️ 32 characters min |
| `sustainsutra_email_password` | Your Gmail App Password | https://support.google.com/accounts/answer/185833 |
| `sustainsutra_razorpay_secret` | From Razorpay Dashboard | https://dashboard.razorpay.com |
| `sustainsutra_sentry_dsn` | From Sentry (optional) | https://sentry.io |

#### 2. Verify Network Exists

Go to: **Portainer → Networks**

Check if `sustainsutra-network` exists. If not, it will be created automatically.

#### 3. Verify Volumes Exist (Optional)

Go to: **Portainer → Volumes**

These will be created automatically, but you can pre-create if needed:
- `sustainsutra-mongo-data`
- `sustainsutra-mongo-config`
- `sustainsutra-uploads-data`
- `sustainsutra-logs-data`

---

## 🎯 Deployment Steps in Portainer

### Step 1: Add New Stack

1. **Open Portainer**
2. **Click**: "Stacks" → "Add Stack" (+)
3. **Stack Name**: `sustainsutra-production`
4. **Build Method**: Select **"Git Repository"**

### Step 2: Configure Git Repository

**Repository URL**:
```
https://github.com/amitkr64/sustainsutra.git
```

**Branch**: `main`

**Compose Path**: `docker-compose.prod.yml`

**Auto-build**: ✅ **ENABLE THIS** (Critical!)

**Force pull**: ✅ ENABLE THIS

### Step 3: Deploy

1. **Click**: "Deploy the stack"
2. **Wait**: 5-10 minutes for build to complete
3. **Monitor**: Watch logs for any errors

---

## ✅ Verify Deployment

### Check Containers are Healthy

In **Portainer → Containers**, you should see:

| Container | Status | Health |
|-----------|--------|--------|
| `sustainsutra-frontend` | Up | healthy |
| `sustainsutra-backend` | Up | healthy |
| `sustainsutra-mongo` | Up | healthy |

### Check Logs

**Frontend**:
```
✓ Nginx is running
✓ Server started on port 80
```

**Backend**:
```
✓ MongoDB Connected Successfully
Server running in production mode on port 5000
✓ NOT "npm error Missing script: start"
```

**MongoDB**:
```
✓ MongoDB is ready
✓ Waiting for connections
```

---

## 👤 Create Admin User

Once backend is running and healthy:

**Option A: Via Portainer Console**
1. **Containers** → `sustainsutra-backend`
2. **Click**: "Console" button
3. **Connect** to get shell
4. **Run**: `npm run seed`
5. **Should see**: `Data Imported Successfully!`

**Option B: Via Command Line**
```bash
docker exec -it sustainsutra-backend npm run seed
```

### Login Credentials

```
📧 Email:    admin@sustainsutra.com
🔒 Password:  admin123
👤 Role:      Admin
📱 Phone:      +91-8742939191
```

### Important: Change Password!

After first login:
1. Go to **Profile** or **Settings**
2. **Change password** to something secure
3. **Update email** to your actual email

---

## 🌐 Access Your Application

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | `http://your-server-ip:8085` | Main application |
| **Backend API** | `http://your-server-ip:5000/api/health` | Health check |
| **MongoDB** | Internal only (port 27017) | Database |

**Replace `your-server-ip`** with your actual server IP or domain.

---

## 🔧 Troubleshooting

### Issue: Build Fails

**Symptom**: Stack shows "Deployment failed" or "Build error"

**Solution**:
1. Check Portainer logs: **Stack → Show logs**
2. Look for: `failed to fetch` or `build error`
3. Check internet connectivity on server
4. Verify GitHub repository is public (it is)

### Issue: Container Restart Loop

**Symptom**: Backend container keeps restarting

**Solution**:
1. Check backend logs: **Containers → sustainsutra-backend → Logs**
2. Look for database connection errors
3. Verify MongoDB container is healthy first
4. Check if secrets are created correctly

### Issue: Cannot Login

**Symptom**: "Invalid credentials" error

**Solution**:
1. Run seeder again to create admin user
2. Check MongoDB for user data:
   ```bash
   docker exec -it sustainsutra-mongo mongosh
   use sustainsutra
   db.users.find({})
   ```
3. If no results, seeder failed - run it again

---

## 📊 Resource Requirements

**Minimum**:
- CPU: 2 cores
- RAM: 4 GB
- Disk: 20 GB free

**Recommended**:
- CPU: 4 cores
- RAM: 8 GB
- Disk: 50 GB free

---

## 🔒 Security Checklist

Before going to production:

- [ ] Changed default admin password
- [ ] Updated JWT_SECRET (strong, 64+ chars)
- [ ] Changed MongoDB password
- [ ] Configured SSL/TLS (Traefik or certificates)
- [ ] Set up firewall rules
- [ ] Enabled backups
- [ ] Configured monitoring (UptimeRobot)
- [ ] Tested all critical features

---

## 📞 Support & Help

### Documentation
- **Deployment Guide**: `README.md`
- **API Endpoints**: Backend codebase
- **Health Check**: `http://your-server:5000/api/health`

### Emergency Contacts
- **Email**: info@sustainsutra.in
- **Phone**: +91-8742939191
- **Location**: Ghaziabad, Uttar Pradesh, India

### GitHub Issues
- **Repository**: https://github.com/amitkr64/sustainsutra/issues
- **New Issue**: Describe problem + logs + screenshots

---

## ✅ Success Criteria

Your deployment is successful when:

✅ All containers show "healthy" status
✅ Frontend loads in browser
✅ Backend health check returns 200 OK
✅ Can login with admin credentials
✅ User can register new account
✅ Database persists data

**First login must be followed by password change!** ⚠️

---

**Ready to deploy! Just follow the steps above in Portainer.** 🚀
