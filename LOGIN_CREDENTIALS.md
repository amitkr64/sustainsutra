# 🔐 SustainSutra - Login Credentials Guide

## 🎯 Default Admin Account

Based on the seeder configuration, here are the **default login credentials**:

### **Admin User**
```
Email: admin@sustainsutra.com
Password: admin123
Role: Admin
```

**⚠️ IMPORTANT**: Change this password immediately after first login!

---

## 👤 Creating New Users

### Option 1: Self-Registration (Recommended)

1. **Open the application** in your browser
2. **Click** "Sign Up" or "Register"
3. **Fill in**:
   - Name
   - Email
   - Password
   - Phone Number
4. **Submit** the form
5. **Login** with your new credentials

### Option 2: Run Seeder to Reset Admin

If you need to reset the admin account:

```bash
# Access the backend container
docker exec -it sustainsutra-backend sh

# Run the seeder
npm run seed

# Or run directly
cd backend && npm run seed
```

This will:
- Create admin user: `admin@sustainsutra.com` / `admin123`
- Add sample courses
- Remove existing users and courses

### Option 3: Create User via MongoDB

```bash
# Access MongoDB container
docker exec -it sustainsutra-mongo mongosh

# Switch to sustainsutra database
use sustainsutra

# Create new admin user
db.users.insertOne({
  name: "Your Name",
  email: "your-email@example.com",
  password: "$2a$10$...", // bcrypt hashed password
  role: "admin",
  phone: "1234567890",
  createdAt: new Date()
})
```

---

## 🛡️ Security Best Practices

### **Immediately After Deployment:**

1. **Login** as admin: `admin@sustainsutra.com` / `admin123`
2. **Navigate** to Profile/Settings
3. **Change password** to a strong, unique password
4. **Update email** if needed
5. **Enable 2FA** if available

### **Password Requirements:**
- Minimum 8 characters
- Use uppercase, lowercase, numbers, special characters
- Don't reuse passwords
- Change every 90 days

### **User Roles:**
- **admin**: Full access to all features and settings
- **user**: Standard user access (can calculate, view reports)

---

## 🔑 Resetting Passwords

### Option 1: Via Application UI (Recommended)

If you're logged in:
1. Go to Profile → Settings
2. Click "Change Password"
3. Enter old password
4. Enter new password
5. Confirm and save

### Option 2: Via MongoDB Directly

```bash
# Connect to MongoDB
docker exec -it sustainsutra-mongo mongosh
use sustainsutra

# Find user
db.users.findOne({email: "admin@sustainsutra.com"})

# Reset password (update the hash)
db.users.updateOne(
  {email: "admin@sustainsutra.com"},
  {$set: {password: "new_hashed_password"}}
)
```

### Option 3: Via Backend API

```bash
# Reset password endpoint (if implemented)
curl -X POST http://your-domain:5000/api/users/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@sustainsutra.com", "newPassword": "newpass123"}'
```

---

## 🚨 Troubleshooting Login Issues

### Issue: "Invalid Credentials"

**Possible Causes:**
1. Wrong email/password
2. User doesn't exist
3. Database not seeded

**Solutions:**
```bash
# Check if user exists in database
docker exec -it sustainsutra-mongo mongosh
use sustainsutra
db.users.find({email: "admin@sustainsutra.com"})

# If no results, run seeder
docker exec -it sustainsutra-backend npm run seed
```

### Issue: "Database Connection Failed"

**Possible Causes:**
1. MongoDB container not running
2. Backend can't connect to database
3. Network issues

**Solutions:**
```bash
# Check MongoDB is running
docker ps | grep mongo

# Check backend logs
docker logs sustainsutra-backend

# Restart services
docker restart sustainsutra-mongo sustainsutra-backend
```

### Issue: "CORS Error" in Browser

**Possible Causes:**
1. Frontend URL not in CORS allowed origins
2. Wrong environment variable configuration

**Solutions:**
```bash
# Check CORS_ORIGIN in backend environment
docker exec sustainsutra-backend env | grep CORS_ORIGIN

# Should match your frontend URL
# Example: http://localhost:8085 or https://your-domain.com
```

---

## 📊 User Management (Admin Only)

### View All Users

```bash
# Access MongoDB
docker exec -it sustainsutra-mongo mongosh
use sustainsutra

# List all users
db.users.find({}, {name: 1, email: 1, role: 1, _id: 0})
```

### Delete User

```bash
# Via MongoDB
db.users.deleteOne({email: "user@example.com"})

# Via Application UI
# Login as admin → Navigate to Admin → User Management → Delete
```

### Change User Role

```bash
# Via MongoDB
db.users.updateOne(
  {email: "user@example.com"},
  {$set: {role: "admin"}}
)
```

---

## 🌐 Application URLs

Based on your deployment configuration:

| Service | URL | Notes |
|---------|-----|-------|
| **Frontend** | `http://localhost:8085` or `http://your-domain:8085` | Main application |
| **Backend API** | `http://localhost:5000` or `http://your-domain:5000` | API endpoints |
| **Health Check** | `http://localhost:5000/api/health` | Status endpoint |

---

## 📱 First Time Setup Checklist

- [ ] Login with default admin account
- [ ] Change admin password immediately
- [ ] Update admin email if needed
- [ ] Configure email service (optional)
- [ ] Set up payment gateway (optional)
- [ ] Add emission factors data
- [ ] Create additional admin users if needed
- [ ] Test user registration flow
- [ ] Verify all features working

---

## 🔐 Security Checklist

### Before Going Live:
- [ ] ✅ Changed default admin password
- [ ] ✅ JWT_SECRET is strong and unique (not default)
- [ ] ✅ Database has authentication enabled (production)
- [ ] ✅ SSL/TLS enabled (HTTPS)
- [ ] ✅ Firewall configured
- [ ] ✅ Rate limiting enabled
- [ ] ✅ CORS configured correctly
- [ ] ✅ Regular backups configured

---

## 📞 Need Help?

### Application Support
- **Email**: info@sustainsutra.in
- **Phone**: +91-8742939191
- **Location**: Ghaziabad, Uttar Pradesh, India

### Documentation
- **Deployment Guide**: `PORTAINER_DEPLOYMENT_GUIDE.md`
- **Quick Reference**: `PORTAINER_QUICK_REFERENCE.md`
- **Full README**: `README.md`

---

## 🎓 Quick Start

### For Testing:
```
Email: admin@sustainsutra.com
Password: admin123
```

### For Production:
1. Login with above credentials
2. Change password immediately
3. Update email to your admin email
4. Create additional users as needed
5. Start using the application!

---

**Last Updated**: 2026-02-14
**Version**: 1.0.0

**⚠️ Remember**: Always change default passwords before going to production!
