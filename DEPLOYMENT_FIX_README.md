# 🚨 URGENT: Backend Container Fix Required

## Problem
Backend container fails with: `npm error Missing script: "start"`

## Root Cause
The Docker Hub image `amitkr64/sustainsutra-backend:latest` was built BEFORE we fixed the `package.json` typos.

## Solution Required
Build NEW Docker image with the fixed code from GitHub.

---

## ✅ ALREADY DONE (GitHub Repository)

✅ **Fixed** `backend/package.json` - All typos corrected:
- `helmet` → `helmet` (fixed)
- `multer` → `multer` (fixed)
- `nodemailer` → `nodemailer` (fixed)
- `pdfkit` → `pdfkit` (fixed)
- `winston` → `winston` (fixed)
- `nodemon` → `nodemon` (fixed)

✅ **Committed** to GitHub (commit 9872784)
✅ **Pushed** to GitHub main branch

---

## 🔨 YOU NEED TO DO (On Your Machine)

### Step 1: Build New Docker Images

Open **PowerShell** as Administrator and run:

```powershell
cd D:\Application_Dev\SustainSutra
docker build -t amitkr64/sustainsutra-backend:latest -f backend\Dockerfile backend
```

Expected output:
```
=> CACHED step 1/8 : FROM node:18-alpine
=> CACHED step 2/8 : WORKDIR /app
=> CACHED step 3/8 : COPY package*.json ./
=> CACHED step 4/8 : RUN npm install --production
=> CACHED step 5/8 : COPY . .
=> CACHED step 6/8 : EXPOSE 5000
=> naming to amitkr64/sustainsutra-backend:latest
```

### Step 2: Push to Docker Hub

```powershell
docker login
# Username: amitkr64
# Password: [your password]

docker push amitkr64/sustainsutra-backend:latest
```

### Step 3: Update in Portainer

1. Portainer → Stacks → `sustainsutra-production`
2. Click "Update the stack"
3. Backend will restart with new image
4. **Should work without npm errors!**

---

## 🎯 Verification

After backend restarts, logs should show:
```
✓ MongoDB Connected Successfully
Server running in production mode on port 5000
```

**NOT**: `npm error Missing script: "start"`

---

## 👤 Create Admin User

```powershell
docker exec -it sustainsutra-backend npm run seed
```

Login credentials:
- Email: `admin@sustainsutra.com`
- Password: `admin123`

---

## 📋 Files Ready

All fixes are in GitHub. The backend/Dockerfile is correct. When you build a new image, it will use the fixed package.json and work correctly.

**Next action: Run the build command above on your Windows machine!**
