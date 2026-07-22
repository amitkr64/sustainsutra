# 🚀 SustainSutra Production Deployment Package

## 📦 What's Included

This deployment package contains all the configuration files needed to deploy SustainSutra to production using Portainer.

### 📁 Configuration Files

| File | Purpose | Status |
|------|---------|--------|
| `docker-compose.prod.yml` | **Main production configuration** | ✅ Ready |
| `.env.production.example` | Environment variables template | ✅ Ready |
| `docker-compose.traefik.yml` | SSL/TLS reverse proxy (optional) | ✅ Ready |
| `scripts/backup.sh` | Automated database backup | ✅ Ready |
| `.dockerignore` | Build optimization | ✅ Ready |

### 📚 Documentation

| Document | Description |
|----------|-------------|
| `PORTAINER_DEPLOYMENT_GUIDE.md` | **Complete deployment guide** (START HERE) |
| `PORTAINER_QUICK_REFERENCE.md` | Quick reference card for operators |
| `DEPLOYMENT_CHECKLIST.md` | Pre-flight checklist |
| `README.md` | Application documentation |

---

## ✅ Deployment Status

### ✨ **COMPLETE** - Ready for Portainer Deployment

All critical issues have been addressed:

- ✅ **Security**: Secrets externalized, no hardcoded credentials
- ✅ **Health Checks**: All services monitored with health endpoints
- ✅ **Resource Limits**: CPU and memory constraints configured
- ✅ **Persistent Storage**: Volumes properly configured with host paths
- ✅ **Logging**: Configured with rotation policies
- ✅ **Backups**: Automated MongoDB backup script included
- ✅ **Network Isolation**: Dedicated Docker network
- ✅ **Restart Policies**: Automatic recovery on failure

---

## 🚀 Quick Start (5-Minute Guide)

### Prerequisites

1. **Portainer CE/Business Edition** running
2. **Server** with Docker Engine 20.10+
3. **Domain** pointing to your server (optional, for SSL)
4. **20GB+** free disk space
5. **4GB+** RAM available

### Step 1: Generate Secrets (2 minutes)

```bash
# Generate JWT secret
openssl rand -base64 64

# Generate MongoDB password
openssl rand -base64 32

# Save these values - you'll need them in Step 3
```

### Step 2: Prepare Host System (1 minute)

```bash
# Create volume directories
sudo mkdir -p /var/lib/sustainsutra/{mongo/{data,config,backup},uploads,logs}

# Set permissions
sudo chown -R 999:999 /var/lib/sustainsutra/mongo
sudo chown -R 1000:1000 /var/lib/sustainsutra/{uploads,logs}
```

### Step 3: Deploy to Portainer (2 minutes)

1. **Open Portainer**: `http://your-portainer:9000`
2. **Create Secrets** (Secrets → Add Secret):
   - `sustainsutra_jwt_secret` → [from Step 1]
   - `sustainsutra_mongo_username` → `admin`
   - `sustainsutra_mongo_password` → [from Step 1]
   - `sustainsutra_email_password` → [your SMTP app password]

3. **Create Stack** (Stacks → Add Stack):
   - Name: `sustainsutra-production`
   - Upload: `docker-compose.prod.yml`

4. **Add Environment Variables**:
   ```env
   DOMAIN=your-domain.com
   API_URL=http://your-domain:5000
   FRONTEND_URL=http://your-domain:8085
   CORS_ORIGIN=http://your-domain:8085
   ```

5. **Deploy** the stack

### Step 4: Verify (30 seconds)

```bash
# Check services are running
docker ps | grep sustainsutra

# Verify health
curl http://localhost:5000/api/health

# Access application
# Frontend: http://your-domain:8085
# Backend: http://your-domain:5000
```

**That's it!** Your application is now running in production mode.

---

## 📖 Detailed Instructions

For comprehensive deployment instructions, see:
- **📖 Full Guide**: [PORTAINER_DEPLOYMENT_GUIDE.md](./PORTAINER_DEPLOYMENT_GUIDE.md)
- **⚡ Quick Reference**: [PORTAINER_QUICK_REFERENCE.md](./PORTAINER_QUICK_REFERENCE.md)
- **✅ Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 🔐 Security Configuration

### Required Secrets

Before deployment, you MUST create these secrets in Portainer:

| Secret Name | Purpose | Generation |
|-------------|---------|------------|
| `sustainsutra_jwt_secret` | JWT token signing | `openssl rand -base64 64` |
| `sustainsutra_mongo_username` | MongoDB admin user | Use `admin` |
| `sustainsutra_mongo_password` | MongoDB password | `openssl rand -base64 32` |
| `sustainsutra_email_password` | SMTP authentication | Google App Password |

**IMPORTANT**: Never commit secrets to version control!

### SSL/TLS Configuration (Recommended)

For production HTTPS, you have two options:

#### Option 1: Traefik (Recommended - Automatic SSL)
```bash
# Deploy Traefik stack first
# Portainer → Stacks → Add Stack
# Upload: docker-compose.traefik.yml
# Deploy

# Then update main stack to use Traefik labels
# See PORTAINER_DEPLOYMENT_GUIDE.md for details
```

#### Option 2: Manual SSL Certificates
- Use Let's Encrypt Certbot
- Mount certificates to nginx
- Update nginx.conf for SSL

---

## 🔄 Updating & Maintenance

### Daily Operations (5 min/day)
- [ ] Check stack health in Portainer
- [ ] Review error logs
- [ ] Monitor disk usage

### Weekly Maintenance (15 min/week)
- [ ] Review and archive logs
- [ ] Verify backups completed
- [ ] Check for security updates

### Monthly Updates (1 hour/month)
- [ ] Rotate secrets (recommended)
- [ ] Update Docker images
- [ ] Test restore procedure
- [ ] Performance audit

### Update Application
```bash
# Pull latest images
docker pull amitkr64/sustainsutra-frontend:latest
docker pull amitkr64/sustainsutra-backend:latest

# Redeploy in Portainer
# Stack → Editor → Update the stack
```

---

## 📊 Service Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Portainer Host                      │
│                                                        │
│  ┌──────────────────────────────────────────────┐   │
│  │      SustainSutra Network (Bridge)           │   │
│  │                                              │   │
│  │  ┌────────────┐      ┌────────────┐         │   │
│  │  │ Frontend   │ ───▶ │  Backend   │         │   │
│  │  │ :8085      │      │  :5000     │         │   │
│  │  │ (Nginx)    │      │  (Express)  │         │   │
│  │  └────────────┘      └──────┬─────┘         │   │
│  │                             │                │   │
│  │                             ▼                │   │
│  │                      ┌────────────┐           │   │
│  │                      │  MongoDB   │           │   │
│  │                      │  :27017    │           │   │
│  │                      └────────────┘           │   │
│  └──────────────────────────────────────────────┘   │
│                                                        │
│  Persistent Volumes:                                    │
│  └── /var/lib/sustainsutra/                           │
│      ├── mongo/data/          (Database)                │
│      ├── mongo/backup/        (Backups)                 │
│      ├── uploads/             (User files)              │
│      └── logs/                (Application logs)         │
└─────────────────────────────────────────────────────────┘
```

---

## 🆘 Troubleshooting

### Containers Won't Start
```bash
# Check logs
docker logs sustainsutra-backend
docker logs sustainsutra-mongo

# Common issues:
# 1. Volume permissions → fix: sudo chown -R 999:999 /var/lib/sustainsutra/mongo
# 2. Missing secrets → verify: docker secret ls | grep sustainsutra
# 3. Port conflicts → check: sudo lsof -i :8085
```

### Database Connection Failed
```bash
# Verify MongoDB is healthy
docker exec sustainsutra-mongo mongosh --eval "db.adminCommand('ping')"

# Check network connectivity
docker network inspect sustainsutra-network

# Restart services
docker restart sustainsutra-backend sustainsutra-mongo
```

### Health Check Failing
```bash
# Manual health check
curl http://localhost:5000/api/health

# Check if wget is installed
docker exec sustainsutra-backend which wget

# View health status
docker inspect sustainsutra-backend | grep -A 10 Health
```

---

## 📞 Support

### Application Support
- **Email**: info@sustainsutra.in
- **Phone**: +91-8742939191
- **Location**: Ghaziabad, Uttar Pradesh, India

### Documentation
- **Deployment Guide**: [PORTAINER_DEPLOYMENT_GUIDE.md](./PORTAINER_DEPLOYMENT_GUIDE.md)
- **Quick Reference**: [PORTAINER_QUICK_REFERENCE.md](./PORTAINER_QUICK_REFERENCE.md)
- **Full Application Docs**: [README.md](./README.md)

### Emergency Contacts
Record your team contacts here:
```
System Administrator: ______________________
Database Admin:       ______________________
DevOps Engineer:      ______________________
On-Call Phone:        ______________________
```

---

## 📝 Deployment Checklist

Use this checklist before going live:

### Pre-Deployment
- [ ] Secrets created in Portainer (6 required)
- [ ] Host directories created with correct permissions
- [ ] Environment variables configured
- [ ] Domain DNS configured (if using custom domain)
- [ ] Firewall rules configured

### Deployment
- [ ] Stack uploaded to Portainer
- [ ] All containers running (3/3)
- [ ] Health checks passing
- [ ] No errors in logs
- [ ] Frontend accessible
- [ ] Backend API responding

### Post-Deployment
- [ ] User registration tested
- [ ] User login tested
- [ ] File uploads working
- [ ] Database backup verified
- [ ] Monitoring configured
- [ ] SSL/TLS configured (recommended)

---

## 🎉 Success Metrics

Your deployment is successful when:

✅ All 3 containers show "Healthy" status in Portainer
✅ Frontend loads without errors at `http://your-domain:8085`
✅ Backend health check returns 200 OK
✅ Users can register and login
✅ File uploads persist after container restart
✅ Automated backups are running (check `/var/lib/sustainsutra/mongo/backup`)

---

## 📅 Deployment Log

**Deployment Date**: _______________

**Deployed By**: _______________

**Version**: _______________

**Environment**: [ ] Development [ ] Staging [ ] Production

**Pre-Deployment Checks**: ☐ All Passed

**Deployment Notes**:
```
[Record any issues, special configurations, or deviations from standard procedure]
```

**Post-Deployment Verification**: ☐ Passed  ☐ Failed

**Go-Live Approved By**: _______________

---

**Document Version**: 1.0.0
**Package Created**: 2026-02-14
**Last Updated**: 2026-02-14
**Valid For**: Production Deployment

---

## 🎓 Next Steps

1. **Read** `PORTAINER_DEPLOYMENT_GUIDE.md` for detailed instructions
2. **Follow** pre-deployment checklist in `DEPLOYMENT_CHECKLIST.md`
3. **Deploy** using `docker-compose.prod.yml`
4. **Verify** using health checks
5. **Monitor** using Portainer dashboard
6. **Bookmark** `PORTAINER_QUICK_REFERENCE.md` for daily operations

**Good luck with your deployment! 🚀**
