# Pre-Production Deployment Checklist

## ✅ **Environment Setup**

### Backend
- [ ] Install all dependencies: `cd backend && npm install`
- [ ] Set up MongoDB (local or Atlas)
- [ ] Configure `.env` file with production values:
  ```env
  NODE_ENV=production
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=super_secure_random_string_min_32_characters
  ```
- [ ] Test backend server: `npm start`

### Frontend
- [ ] Install all dependencies: `npm install`
- [ ] Build production bundle: `npm run build`
- [ ] Preview build: `npm run preview`
- [ ] Verify all routes load correctly

---

## 🔒 **Security Checklist**

- [ ] Change default JWT_SECRET (use strong random string)
- [ ] Enable HTTPS on production server
- [ ] Set secure CORS origins (not `*`)
- [ ] Configure Helmet security headers
- [ ] Remove/update any demo credentials
- [ ] Enable rate limiting (already configured)
- [ ] Set up firewall rules
- [ ] Configure Content Security Policy

---

## 🗄️ **Database**

- [ ] Create production MongoDB database
- [ ] Set up database backups (daily recommended)
- [ ] Create indexes for frequently queried fields
- [ ] Seed initial emission factors data: `cd backend && npm run seed`
- [ ] Test database connectivity

---

## 🚀 **Deployment**

### Docker Deployment (Recommended)
- [ ] Build Docker images: `docker compose build`
- [ ] Start services: `docker compose up -d`
- [ ] Verify all containers running: `docker compose ps`
- [ ] Check logs: `docker compose logs -f`

### Manual Deployment
- [ ] Set up reverse proxy (Nginx recommended)
- [ ] Configure SSL certificates (Let's Encrypt)
- [ ] Set up process manager (PM2 for Node.js)
- [ ] Configure environment variables on server
- [ ] Deploy frontend static files to CDN/web server
- [ ] Start backend API server

---

## 📊 **Post-Deployment Verification**

- [ ] Test homepage loads https://yoursite.com
- [ ] Test user registration flow
- [ ] Test user login
- [ ] Test Carbon Calculator (all scopes)
- [ ] Test payment modal opens
- [ ] Test admin dashboard access
- [ ] Verify email/contact forms work
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Test all API endpoints with Postman

---

## 🔧 **Monitoring & Logging**

- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure application logging (Winston)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure analytics (Google Analytics)
- [ ] Set up database monitoring
- [ ] Create alerts for errors/downtime

---

## 📝 **Documentation**

- [ ] Update README with production URLs
- [ ] Document API endpoints (Swagger/Postman)
- [ ] Create admin user guide
- [ ] Document backup/restore procedures
- [ ] Create runbook for common issues

---

## 💳 **Payment Integration**

- [ ] Get Razorpay/Stripe API keys
- [ ] Configure payment gateway in Admin Panel
- [ ] Test payment flow in sandbox mode
- [ ] Enable live mode after testing
- [ ] Set up webhook endpoints
- [ ] Test transaction receipts

---

## 📧 **Email Configuration** (Optional)

- [ ] Set up email service (SendGrid, AWS SES)
- [ ] Configure SMTP settings
- [ ] Create email templates
- [ ] Test registration confirmation emails
- [ ] Test password reset emails

---

## 🎨 **Content & Assets**

- [ ] Replace placeholder images with real photos
- [ ] Upload company logo
- [ ] Create Open Graph image (og-image.jpg)
- [ ] Add team member photos/bios
- [ ] Populate emission factors database
- [ ] Create initial blog posts
- [ ] Add courses to academy

---

## ⚡ **Performance Optimization**

- [ ] Enable Gzip compression
- [ ] Configure CDN for static assets
- [ ] Optimize images (WebP format)
- [ ] Enable browser caching
- [ ] Minify CSS/JS (done by Vite build)
- [ ] Lazy load images
- [ ] Implement code splitting

---

## 🧪 **Testing**

- [ ] Run all unit tests (if implemented)
- [ ] Perform manual testing of critical flows
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Load testing for high traffic
- [ ] Security penetration testing

---

## 📱 **SEO & Social**

- [ ] Submit sitemap to Google Search Console
- [ ] Configure robots.txt
- [ ] Test social media sharing (Open Graph tags)
- [ ] Set up Google My Business
- [ ] Create social media accounts
- [ ] Add structured data markup

---

## 🔄 **Backup & Recovery**

- [ ] Set up automated database backups
- [ ] Test database restoration
- [ ] Document recovery procedures
- [ ] Set up code repository backup
- [ ] Create disaster recovery plan

---

## 📞 **Support & Maintenance**

- [ ] Set up support email (info@sustainsutra.in)
- [ ] Create FAQ page
- [ ] Set up ticketing system (optional)
- [ ] Plan regular maintenance windows
- [ ] Document update procedures

---

## ✅ **Final Launch Steps**

1. [ ] Final backup of database and code
2. [ ] Deploy to production
3. [ ] Run smoke tests on production
4. [ ] Monitor error logs for 24 hours
5. [ ] Announce launch
6. [ ] Marketing campaign activation

---

## 🎉 **You're Live!**

**Current System Status:**
- ✅ Error Boundary: Implemented
- ✅ Demo Mode: Active for dev
- ✅ Rate Limiting: Configured
- ✅ Loading Skeletons: Ready
- ✅ SEO Tags: Complete
- ✅ Documentation: Complete

**Remember to run:** `cd backend && npm install` to get express-rate-limit package!

---

**Created**: 2026-01-22  
**Last Updated**: 2026-01-22  
**Version**: 1.0
