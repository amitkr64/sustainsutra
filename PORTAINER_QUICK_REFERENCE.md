# 🚀 Portainer Quick Reference Card - SustainSutra

## 📍 Stack Information
**Stack Name**: `sustainsutra-production`
**Configuration File**: `docker-compose.prod.yml`
**Network**: `sustainsutra-network`

---

## 🔐 Required Secrets

| Secret Name | Description | Generate Command |
|-------------|-------------|------------------|
| `sustainsutra_jwt_secret` | JWT signing key | `openssl rand -base64 64` |
| `sustainsutra_mongo_password` | MongoDB root password | `openssl rand -base64 32` |
| `sustainsutra_mongo_username` | MongoDB admin user | `echo "admin"` |
| `sustainsutra_email_password` | SMTP app password | (Google App Passwords) |
| `sustainsutra_razorpay_secret` | Payment gateway | (Razorpay Dashboard) |

---

## 🌐 Service URLs

| Service | Port | URL | Health Check |
|---------|------|-----|--------------|
| **Frontend** | 8085 | `http://your-domain:8085` | `curl http://localhost:8085` |
| **Backend API** | 5000 | `http://your-domain:5000` | `http://localhost:5000/api/health` |
| **MongoDB** | 27017 | Internal only | `docker exec sustainsutra-mongo mongosh` |
| **Traefik Dashboard** | 8080 | `http://localhost:8080` | (if using Traefik) |

---

## 🛠️ Common Portainer Operations

### View Stack Logs
1. Stacks → `sustainsutra-production` → Editor → Console
2. Select container → Logs

### Restart Stack
1. Stacks → `sustainsutra-production`
2. Click "↓" (Down) then "↑" (Up)

### Update Stack
1. Stacks → `sustainsutra-production` → Editor
2. Edit docker-compose.yml
3. Click "Update the stack"

### Scale Services
```yaml
# In stack editor, add:
services:
  backend:
    deploy:
      replicas: 2
```

---

## 🐳 Docker CLI Commands (Alternative)

### Container Status
```bash
docker ps | grep sustainsutra
docker stats sustainsutra-backend sustainsutra-mongo sustainsutra-frontend
```

### View Logs
```bash
docker logs -f sustainsutra-backend
docker logs --tail 100 sustainsutra-mongo
```

### Restart Services
```bash
docker restart sustainsutra-backend
docker restart sustainsutra-mongo sustainsutra-backend
```

### Access Container Shell
```bash
docker exec -it sustainsutra-backend sh
docker exec -it sustainsutra-mongo mongosh
```

---

## 🔧 Troubleshooting Commands

### Health Check All Services
```bash
# Backend
curl http://localhost:5000/api/health

# Frontend
curl -I http://localhost:8085

# MongoDB
docker exec sustainsutra-mongo mongosh --eval "db.adminCommand('ping')"
```

### Check Resource Usage
```bash
docker stats sustainsutra-backend sustainsutra-mongo sustainsutra-frontend --no-stream
```

### Inspect Container Configuration
```bash
docker inspect sustainsutra-backend | grep -A 20 "Health"
docker network inspect sustainsutra-network
docker volume ls | grep sustainsutra
```

### Volume Permissions
```bash
ls -la /var/lib/sustainsutra/
sudo chown -R 999:999 /var/lib/sustainsutra/mongo
sudo chown -R 1000:1000 /var/lib/sustainsutra/uploads
```

---

## 🔄 Update & Upgrade

### Pull Latest Images
```bash
docker pull amitkr64/sustainsutra-frontend:latest
docker pull amitkr64/sustainsutra-backend:latest
```

### Recreate Containers (Preserves Data)
```bash
# In Portainer: Stack → Editor → Update Stack
# Or CLI:
cd /path/to/compose/file
docker-compose -f docker-compose.prod.yml up -d --force-recreate
```

### Database Backup
```bash
# Manual backup
docker exec sustainsutra-mongo mongodump --out /data/backup/manual-$(date +%Y%m%d)

# Automated backup (runs per cron schedule)
ls -la /var/lib/sustainsutra/mongo/backup/
```

---

## 🚨 Emergency Procedures

### Rollback to Previous Version
```bash
# 1. Stop stack
# 2. In Portainer: Edit docker-compose.yml
# 3. Change image tags to previous version:
#    image: amitkr64/sustainsutra-backend:v1.0.0
# 4. Redeploy
```

### Restore Database from Backup
```bash
# 1. Stop backend
docker stop sustainsutra-backend

# 2. Restore backup
docker exec sustainsutra-mongo mongorestore --drop /data/backup/20240101/

# 3. Start backend
docker start sustainsutra-backend
```

### Emergency Shell Access
```bash
# Backend
docker exec -it sustainsutra-backend sh

# MongoDB
docker exec -it sustainsutra-mongo mongosh

# Frontend
docker exec -it sustainsutra-frontend sh
```

---

## 📊 Monitoring Checklist

### Daily (5 minutes)
- [ ] Stack status: All containers running
- [ ] Health checks passing
- [ ] No error logs in last 24h
- [ ] Disk space > 20% free

### Weekly (15 minutes)
- [ ] Review and archive logs
- [ ] Check backup completion
- [ ] Monitor resource trends
- [ ] Security updates review

### Monthly (1 hour)
- [ ] Test restore procedure
- [ ] Rotate secrets (recommended)
- [ ] Update Docker images
- [ ] Performance audit
- [ ] Disaster recovery test

---

## 🔑 Environment Variables Reference

### Required Variables
```env
DOMAIN=your-domain.com
API_URL=https://api.your-domain.com
FRONTEND_URL=https://your-domain.com
CORS_ORIGIN=https://your-domain.com
```

### Optional Variables
```env
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW=15
MAX_FILE_SIZE=10485760
BACKUP_SCHEDULE=0 2 * * *
```

### Volume Paths
```env
MONGO_DATA_PATH=/var/lib/sustainsutra/mongo/data
MONGO_CONFIG_PATH=/var/lib/sustainsutra/mongo/config
MONGO_BACKUP_PATH=/var/lib/sustainsutra/mongo/backup
UPLOADS_PATH=/var/lib/sustainsutra/uploads
LOGS_PATH=/var/lib/sustainsutra/logs
```

---

## 📞 Support Information

### Application Support
- **Email**: info@sustainsutra.in
- **Phone**: +91-8742939191
- **Location**: Ghaziabad, Uttar Pradesh, India

### Documentation
- **Full Deployment Guide**: `PORTAINER_DEPLOYMENT_GUIDE.md`
- **Deployment Checklist**: `DEPLOYMENT_CHECKLIST.md`
- **Environment Setup**: `docs/ENVIRONMENT_SETUP.md`

### Useful Links
- **Portainer Docs**: https://docs.portainer.io/
- **Docker Docs**: https://docs.docker.com/
- **MongoDB Docs**: https://docs.mongodb.com/

---

## 📝 Quick Notes

```
[Space for your notes, credentials, or emergency procedures]
```

---

**Version**: 1.0.0
**Last Updated**: 2026-02-14
**Valid Until**: 2026-05-14
