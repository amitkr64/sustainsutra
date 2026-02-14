# 🚀 SustainSutra - Portainer Deployment Guide

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Secrets Configuration](#secrets-configuration)
4. [Volume Preparation](#volume-preparation)
5. [Deployment Steps](#deployment-steps)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance & Monitoring](#maintenance--monitoring)

---

## ✅ Pre-Deployment Checklist

### Server Requirements
- [ ] Docker Engine 20.10+ installed
- [ ] Docker Compose v2.x installed
- [ ] Portainer CE or Business Edition running
- [ ] Minimum 4GB RAM available
- [ ] Minimum 20GB disk space available
- [ ] Ports 8085, 5000 available (or adjust in config)

### Security Setup
- [ ] Firewall configured (UFW/iptables)
- [ ] SSL/TLS certificates ready (Let's Encrypt or custom)
- [ ] Domain DNS configured
- [ ] Reverse proxy configured (Traefik/Nginx) if needed

### Database Setup
- [ ] MongoDB backup strategy planned
- [ ] Database credentials generated
- [ ] Volume paths created on host system

---

## 🔧 Environment Setup

### Step 1: Create Required Directories

```bash
# Create volume directories on host system
sudo mkdir -p /var/lib/sustainsutra/mongo/data
sudo mkdir -p /var/lib/sustainsutra/mongo/config
sudo mkdir -p /var/lib/sustainsutra/mongo/backup
sudo mkdir -p /var/lib/sustainsutra/uploads
sudo mkdir -p /var/lib/sustainsutra/logs

# Set proper permissions
sudo chown -R 999:999 /var/lib/sustainsutra/mongo
sudo chown -R 1000:1000 /var/lib/sustainsutra/uploads
sudo chown -R 1000:1000 /var/lib/sustainsutra/logs

# Verify directories
ls -la /var/lib/sustainsutra/
```

### Step 2: Configure Environment Variables

```bash
# Copy environment template
cp .env.production.example .env.production

# Edit with your production values
nano .env.production
```

**Critical Variables to Update:**
```env
DOMAIN=your-actual-domain.com
API_URL=https://api.your-actual-domain.com
FRONTEND_URL=https://your-actual-domain.com
CORS_ORIGIN=https://your-actual-domain.com
JWT_SECRET=GENERATE_SECURE_VALUE_SEE_BELOW
```

---

## 🔐 Secrets Configuration

### Generate Secure Secrets

```bash
# Generate JWT Secret (CRITICAL)
openssl rand -base64 64

# Generate MongoDB Root Password
openssl rand -base64 32

# Generate MongoDB Username (or use "admin")
echo "admin"

# Save these values temporarily - you'll need them for Portainer
```

### Create Secrets in Portainer

#### Option A: Via Portainer UI

1. **Open Portainer Dashboard**
2. **Navigate to**: Secrets
3. **Click**: Add Secret
4. **Create each secret**:

| Secret Name | Description | Example Value |
|-------------|-------------|----------------|
| `sustainsutra_jwt_secret` | JWT signing key | `[Output of openssl command]` |
| `sustainsutra_email_password` | SMTP app password | `[Google App Password]` |
| `sustainsutra_razorpay_secret` | Payment gateway | `[From Razorpay Dashboard]` |
| `sustainsutra_sentry_dsn` | Error tracking | `[From Sentry Dashboard]` |
| `sustainsutra_mongo_username` | MongoDB admin | `admin` |
| `sustainsutra_mongo_password` | MongoDB password | `[Output of openssl command]` |

#### Option B: Via Docker CLI

```bash
# JWT Secret
openssl rand -base64 64 | docker secret create sustainsutra_jwt_secret -

# Email Password
echo "your-google-app-password" | docker secret create sustainsutra_email_password -

# Razorpay Secret
echo "your-razorpay-secret" | docker secret create sustainsutra_razorpay_secret -

# Sentry DSN (optional - leave empty if not using)
echo "your-sentry-dsn" | docker secret create sustainsutra_sentry_dsn -

# MongoDB Username
echo "admin" | docker secret create sustainsutra_mongo_username -

# MongoDB Password
openssl rand -base64 32 | docker secret create sustainsutra_mongo_password -

# Verify secrets created
docker secret ls
```

---

## 📦 Volume Preparation

### Verify Volume Paths

```bash
# Check if directories exist
ls -la /var/lib/sustainsutra/mongo/data
ls -la /var/lib/sustainsutra/mongo/config
ls -la /var/lib/sustainsutra/mongo/backup
ls -la /var/lib/sustainsutra/uploads
ls -la /var/lib/sustainsutra/logs

# Create directories if missing
sudo mkdir -p /var/lib/sustainsutra/{mongo/{data,config,backup},uploads,logs}

# Set permissions
sudo chown -R 999:999 /var/lib/sustainsutra/mongo
sudo chown -R 1000:1000 /var/lib/sustainsutra/{uploads,logs}
```

---

## 🚀 Deployment Steps

### Step 1: Access Portainer

1. **Open Portainer**: `http://your-portainer-server:9000`
2. **Login** with admin credentials
3. **Select your Endpoint** (Docker environment)

### Step 2: Create New Stack

1. **Navigate to**: Stacks → Add Stack
2. **Stack Name**: `sustainsutra-production`
3. **Deployment Method**: Upload docker-compose file

### Step 3: Upload Configuration

1. **Upload**: `docker-compose.prod.yml`
2. **Or paste** the content directly into the editor
3. **Click**: "Upload from file" → Select `docker-compose.prod.yml`

### Step 4: Configure Environment Variables

Add these in the "Environment variables" section:

| Variable | Value | Description |
|----------|-------|-------------|
| `DOMAIN` | `your-domain.com` | Production domain |
| `API_URL` | `https://api.your-domain.com` | Backend API URL |
| `FRONTEND_URL` | `https://your-domain.com` | Frontend URL |
| `CORS_ORIGIN` | `https://your-domain.com` | CORS allowed origin |
| `FRONTEND_PORT` | `8085` | Frontend port |
| `BACKEND_PORT` | `5000` | Backend port |
| `JWT_EXPIRE` | `7d` | Token expiration |
| `RATE_LIMIT_ENABLED` | `true` | Enable rate limiting |
| `RATE_LIMIT_WINDOW` | `15` | Rate limit window (minutes) |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |
| `MAX_FILE_SIZE` | `10485760` | Max upload size (bytes) |
| `BACKUP_SCHEDULE` | `0 2 * * *` | Backup cron schedule |

### Step 5: Deploy the Stack

1. **Click**: "Deploy the stack"
2. **Wait** for all services to start
3. **Monitor** logs in Portainer console

### Step 6: Verify Deployment

```bash
# Check container status
docker ps | grep sustainsutra

# Check health status
docker inspect sustainsutra-backend | grep -A 10 Health

# View logs
docker logs sustainsutra-backend
docker logs sustainsutra-frontend
docker logs sustainsutra-mongo
```

---

## ✅ Post-Deployment Verification

### Health Check Endpoints

```bash
# Backend Health
curl http://your-domain.com:5000/api/health

# Expected Response:
{
  "status": "healthy",
  "timestamp": "2024-XX-XX",
  "demoMode": false,
  "database": "connected"
}

# Frontend Access
curl -I http://your-domain.com:8085

# Expected Response: HTTP/1.1 200 OK
```

### Application Testing Checklist

- [ ] Homepage loads at `http://your-domain:8085`
- [ ] API health check returns healthy status
- [ ] Database connection successful
- [ ] User registration works
- [ ] User login works
- [ ] File uploads work
- [ ] Email notifications work (if configured)
- [ ] Payment modal opens (if configured)
- [ ] Admin dashboard accessible

### Database Verification

```bash
# Access MongoDB container
docker exec -it sustainsutra-mongo mongosh

# In MongoDB shell:
show dbs
use sustainsutra
show collections
db.users.countDocuments()
exit
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Containers Won't Start

```bash
# Check container logs
docker logs sustainsutra-backend
docker logs sustainsutra-mongo

# Check volume permissions
ls -la /var/lib/sustainsutra/

# Fix permissions if needed
sudo chown -R 999:999 /var/lib/sustainsutra/mongo
sudo chown -R 1000:1000 /var/lib/sustainsutra/uploads
```

#### 2. Database Connection Failed

```bash
# Check MongoDB health
docker exec sustainsutra-mongo mongosh --eval "db.adminCommand('ping')"

# Check network connectivity
docker network inspect sustainsutra-network

# Restart services
docker restart sustainsutra-backend sustainsutra-mongo
```

#### 3. Secret Not Found Error

```bash
# Verify secrets exist
docker secret ls | grep sustainsutra

# Check secret name in docker-compose
grep "secrets:" docker-compose.prod.yml

# Recreate missing secrets
echo "value" | docker secret create secret_name -
```

#### 4. Health Check Failing

```bash
# Check if wget is installed in container
docker exec sustainsutra-backend which wget

# If not found, rebuild image with wget installed
# Or use curl instead (update docker-compose.prod.yml)
```

#### 5. Port Already in Use

```bash
# Find process using port
sudo lsof -i :8085
sudo lsof -i :5000

# Kill conflicting process or change ports in docker-compose
```

### Log Analysis

```bash
# Real-time logs
docker logs -f sustainsutra-backend

# Last 100 lines
docker logs --tail 100 sustainsutra-mongo

# Logs with timestamps
docker logs -t sustainsutra-frontend

# Export logs
docker logs sustainsutra-backend > backend.log 2>&1
```

---

## 📊 Maintenance & Monitoring

### Daily Checks

- [ ] Check container health status
- [ ] Review error logs
- [ ] Monitor disk usage
- [ ] Verify backups completed

### Weekly Tasks

- [ ] Rotate logs if needed
- [ ] Review security updates
- [ ] Test restore procedure
- [ ] Monitor resource usage

### Monthly Tasks

- [ ] Update Docker images
- [ ] Rotate secrets (recommended)
- [ ] Review and optimize database
- [ ] Audit user access

### Backup Strategy

#### Automated Backup (Recommended)

```bash
# Backup script is included in docker-compose.prod.yml
# Backups run at 2 AM daily by default

# Manual backup
docker exec sustainsutra-mongo mongodump --out /data/backup/$(date +%Y%m%d)

# List backups
ls -la /var/lib/sustainsutra/mongo/backup/

# Restore from backup
docker exec sustainsutra-mongo mongorestore --drop /data/backup/20240101/
```

#### External Backup (Atlas/Bespoke)

Consider MongoDB Atlas for:
- Automated backups
- Point-in-time recovery
- Global distribution
- Advanced security

### Monitoring Setup

#### Portainer Native Monitoring

1. **Navigate to**: Container → Console
2. **Monitor**: CPU, Memory, Network I/O
3. **Set Alerts**: Email notifications

#### External Monitoring

- **UptimeRobot**: `https://uptimerobot.com`
  - Monitor: `https://your-domain.com:5000/api/health`
  - Alert interval: 5 minutes

- **Sentry** (Error Tracking):
  - Configure DSN in environment variables
  - Monitor: https://sentry.io

#### Resource Monitoring

```bash
# Container stats
docker stats sustainsutra-backend sustainsutra-mongo sustainsutra-frontend

# Volume usage
du -sh /var/lib/sustainsutra/*

# Docker system usage
docker system df
```

---

## 🔄 Updates & Upgrades

### Update Application

```bash
# 1. Pull latest images
docker pull amitkr64/sustainsutra-frontend:latest
docker pull amitkr64/sustainsutra-backend:latest

# 2. Redeploy in Portainer
# Navigate to Stack → Editor → Update Stack

# 3. Or use docker-compose
cd /path/to/docker-compose
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

### Database Migration

```bash
# Before major updates, backup database
docker exec sustainsutra-mongo mongodump --out /data/backup/pre-upgrade

# Test migration on staging first
# Run migration scripts if needed
# Verify application functionality
# Monitor for 24 hours before proceeding to next update
```

---

## 🛡️ Security Best Practices

1. **Regular Security Updates**
   ```bash
   # Update host system
   sudo apt update && sudo apt upgrade -y

   # Update Docker
   sudo apt install --only-upgrade docker-ce docker-ce-cli containerd.io
   ```

2. **Secret Rotation**
   ```bash
   # Every 90 days recommended
   # Generate new secrets
   # Update in Portainer
   # Redeploy stack
   ```

3. **Access Control**
   - Enable Portainer RBAC (Business Edition)
   - Use strong passwords for admin accounts
   - Enable 2FA where available
   - Limit SSH access to server

4. **Network Security**
   ```bash
   # Configure firewall (UFW example)
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 9000/tcp  # Portainer
   sudo ufw enable
   ```

5. **SSL/TLS Configuration**
   - Use reverse proxy (Traefik recommended)
   - Configure Let's Encrypt certificates
   - Enable HSTS headers
   - Force HTTPS redirects

---

## 📞 Support & Resources

### Documentation
- Main README: `README.md`
- Deployment Checklist: `DEPLOYMENT_CHECKLIST.md`
- Environment Setup: `docs/ENVIRONMENT_SETUP.md`

### Contact
- **Email**: info@sustainsutra.in
- **Phone**: +91-8742939191
- **Location**: Ghaziabad, Uttar Pradesh, India

### Emergency Contacts
- System Administrator: [Your Admin]
- Database Admin: [Your DBA]
- DevOps Engineer: [Your DevOps]

---

## 📝 Deployment Log

**Deployment Date**: _______________

**Deployed By**: _______________

**Version**: _______________

**Notes**:
```
[Record any deployment notes, issues, or special configurations here]
```

**Post-Deployment Verification**: ☐ Passed  ☐ Failed

---

**Document Version**: 1.0.0
**Last Updated**: 2026-02-14
**Next Review**: 2026-03-14
