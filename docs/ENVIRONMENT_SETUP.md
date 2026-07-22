# Environment Setup Guide

This document provides comprehensive instructions for setting up environment variables for SustainSutra in different environments.

---

## Table of Contents

1. [Local Development](#local-development)
2. [Production Deployment](#production-deployment)
3. [Docker Deployment](#docker-deployment)
4. [Secrets Management](#secrets-management)
5. [Service-Specific Configuration](#service-specific-configuration)

---

## Local Development

### Frontend Environment Variables (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_APP_URL=http://localhost:3000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PWA=true

# Error Tracking
VITE_SENTRY_DSN=
VITE_SENTRY_ENVIRONMENT=development

# Payment Gateway (Test Mode)
VITE_RAZORPAY_KEY=rzp_test_xxxxx
```

### Backend Environment Variables (backend/.env)

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
MONGO_URI=mongodb://127.0.0.1:27017/sustainsutra
REQUIRE_DB=false

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration (Optional - for testing emails)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@sustainsutra.in

# Payment Gateway (Test Mode)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=test_secret_xxxxx

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Demo Mode
DEMO_MODE=false
```

---

## Production Deployment

### Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use strong, randomly generated secrets** for production
3. **Rotate secrets regularly** (recommended: every 90 days)
4. **Use HTTPS only** in production
5. **Set appropriate CORS origins**

### Required Production Environment Variables

```env
# Server
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com

# Database (MongoDB Atlas recommended)
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/sustainsutra?retryWrites=true&w=majority
REQUIRE_DB=true

# JWT (Use strong 64+ character secret)
JWT_SECRET=<generate-with-openssl-rand-base64-64>
JWT_EXPIRE=7d

# Email (Production SMTP)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=SG.xxxxx
EMAIL_FROM=noreply@sustainsutra.in

# Payment Gateway (Live Mode)
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=live_secret_xxxxx

# Error Tracking
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_ENVIRONMENT=production

# CORS
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

---

## Docker Deployment

### Using Docker Secrets (Recommended)

Create a `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  backend:
    image: sustainsutra-backend:latest
    secrets:
      - mongo_uri
      - jwt_secret
      - email_password
      - razorpay_secret
    environment:
      NODE_ENV: production
      MONGO_URI_FILE: /run/secrets/mongo_uri
      JWT_SECRET_FILE: /run/secrets/jwt_secret
      EMAIL_PASS_FILE: /run/secrets/email_password
      RAZORPAY_KEY_SECRET_FILE: /run/secrets/razorpay_secret

secrets:
  mongo_uri:
    external: true
  jwt_secret:
    external: true
  email_password:
    external: true
  razorpay_secret:
    external: true
```

### Create Secrets:

```bash
echo "mongodb+srv://..." | docker secret create mongo_uri -
openssl rand -base64 64 | docker secret create jwt_secret -
echo "email_password" | docker secret create email_password -
echo "razorpay_secret" | docker secret create razorpay_secret -
```

---

## Secrets Management

### Generating Secure Secrets

```bash
# JWT Secret (64 characters)
openssl rand -base64 64

# Random API Key (32 characters)
openssl rand -base64 32

# MongoDB Password (16 characters)
openssl rand -base64 16
```

### AWS Secrets Manager (Production)

```json
{
    "MongoDB": {
        "URI": "mongodb+srv://user:pass@cluster.mongodb.net/sustainsutra"
    },
    "JWT": {
        "SECRET": "your-secret-here"
    },
    "Email": {
        "PASSWORD": "your-email-password"
    },
    "Razorpay": {
        "KEY_ID": "rzp_live_xxxx",
        "KEY_SECRET": "secret_xxxx"
    },
    "Sentry": {
        "DSN": "https://xxxxx@sentry.io/xxxxx"
    }
}
```

### Docker Secrets (Production)

Create secrets file:
```bash
# .secrets/mongo_uri.txt
mongodb+srv://user:pass@cluster.mongodb.net/sustainsutra

# .secrets/jwt_secret.txt
openssl rand -base64 64

# .secrets/email_password.txt
your-secure-password
```

---

## Service-Specific Configuration

### MongoDB Atlas

1. **Network Access**: Whitelist your server IP addresses
2. **Database Access**: Create database user with readWrite permissions
3. **Clusters**: Use M10+ tier for production (includes backups)

### SendGrid (Email)

```bash
# Create API Key with:
# - Mail Send permissions
# - Restricted to specific verified senders
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=SG.xxxxx_your_api_key
```

### Razorpay (Payments)

```bash
# Test Mode (Development)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=test_xxxxx

# Live Mode (Production)
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=live_xxxxx
```

### Sentry (Error Tracking)

```bash
# Frontend
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
VITE_SENTRY_ENVIRONMENT=production

# Backend
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_ENVIRONMENT=production
```

---

## Validation Checklist

Before deploying to production:

- [ ] All `.env.example` files are up to date
- [ ] JWT_SECRET is 64+ characters
- [ ] MongoDB URI uses `mongodb+srv://` with authentication
- [ ] Email service credentials are verified
- [ ] Payment gateway is in LIVE mode (not TEST mode)
- [ ] CORS_ORIGIN includes all production domains
- [ ] Sentry DSN is configured
- [ ] HTTPS is enforced on all production URLs
- [ ] Database backups are configured
- [ ] Rate limiting is enabled
- [ ] File upload size limits are set appropriately

---

## Environment Variable Reference

### Frontend (.env)

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| VITE_API_URL | string | No | http://localhost:5000 | Backend API URL |
| VITE_APP_URL | string | No | http://localhost:3000 | Frontend app URL |
| VITE_SENTRY_DSN | string | No | - | Sentry DSN for error tracking |
| VITE_SENTRY_ENVIRONMENT | string | No | development | Sentry environment name |
| VITE_ENABLE_ANALYTICS | boolean | No | false | Enable analytics tracking |
| VITE_ENABLE_PWA | boolean | No | true | Enable PWA features |
| VITE_RAZORPAY_KEY | string | No | - | Razorpay key ID |

### Backend (backend/.env)

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| NODE_ENV | string | No | development | Environment (development/production) |
| PORT | number | No | 5000 | Server port |
| FRONTEND_URL | string | Yes | - | Frontend URL for CORS |
| MONGO_URI | string | Yes* | - | MongoDB connection string |
| REQUIRE_DB | boolean | No | false | Fail if DB unavailable |
| JWT_SECRET | string | Yes | - | JWT signing secret |
| JWT_EXPIRE | string | No | 7d | JWT expiration time |
| EMAIL_HOST | string | No | - | SMTP host |
| EMAIL_PORT | number | No | 587 | SMTP port |
| EMAIL_SECURE | boolean | No | false | Use SSL/TLS |
| EMAIL_USER | string | No | - | SMTP username |
| EMAIL_PASS | string | No | - | SMTP password |
| EMAIL_FROM | string | No | - | From email address |
| RAZORPAY_KEY_ID | string | No | - | Razorpay key ID |
| RAZORPAY_KEY_SECRET | string | No | - | Razorpay key secret |
| SENTRY_DSN | string | No | - | Sentry DSN |
| SENTRY_ENVIRONMENT | string | No | development | Sentry environment |
| CORS_ORIGIN | string | No | * | CORS allowed origins |
| RATE_LIMIT_WINDOW | number | No | 15 | Rate limit window (minutes) |
| RATE_LIMIT_MAX_REQUESTS | number | No | 100 | Max requests per window |
| MAX_FILE_SIZE | number | No | 10485760 | Max upload size (bytes) |

*Required unless using Demo Mode

---

## Troubleshooting

### Database Connection Issues

```bash
# Check MongoDB connection string format
mongodb://[username:password@]host[:port][/[database][?options]]

# MongoDB Atlas format
mongodb+srv://[username:password@]host/[database][?options]
```

### Email Not Sending

1. Verify SMTP settings
2. Check if app-specific password is required (Gmail)
3. Verify firewall allows SMTP connections
4. Check email service logs

### JWT Authentication Failing

1. Ensure JWT_SECRET matches between services
2. Check JWT_EXPIRE is not too short
3. Verify token is being sent in cookies/headers

---

## Support

For configuration issues, contact:
- Email: info@sustainsutra.in
- Phone: +91-8742939191

---

**Last Updated**: 2026-02-10
