# 🔧 Create Production Admin User - SustainSutra

## 🚨 Issue: No Admin User in Production Database

The seeder script hasn't been run, so there are no users in the production database yet.

---

## ✅ Solution: Create Admin User

### **Option 1: Via MongoDB Shell (Recommended - Fastest)**

#### Step 1: Access MongoDB Container

```bash
# Access the MongoDB container
docker exec -it sustainsutra-mongo mongosh
```

#### Step 2: Switch to Database

```javascript
use sustainsutra
```

#### Step 3: Check if Users Exist

```javascript
db.users.find()
```

If empty, you need to create the admin user.

#### Step 4: Create Admin User (with Pre-Hashed Password)

```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@sustainsutra.in",
  password: "$2a$10$YourHashedPasswordHere", // We'll generate this
  role: "admin",
  phone: "+91-8742939191",
  createdAt: new Date()
})
```

**⚠️ PROBLEM**: You can't manually insert bcrypt hashed passwords easily.

---

### **Option 2: Run Seeder Script (RECOMMENDED)**

This is the easiest and most reliable method.

#### Via Docker Exec:

```bash
# Access backend container
docker exec -it sustainsutra-backend sh

# Install dependencies if not already installed
npm install

# Run the seeder
npm run seed

# Or run directly with node
node seeder.js
```

This will create:
- **Email**: `admin@sustainsutra.com`
- **Password**: `admin123`
- **Role**: `admin`

#### Via Backend Container Shell:

```bash
# If backend container doesn't have npm/node available
docker exec -it sustainsutra-backend sh

# Check if node is available
which node

# Run seeder
cd /app && node seeder.js
```

---

### **Option 3: Create via API Endpoint**

If the backend is running and accessible:

```bash
# Register new admin user via API
curl -X POST http://your-domain:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@sustainsutra.in",
    "password": "SecurePass123!",
    "phone": "+91-8742939191"
  }'
```

Then promote to admin via MongoDB:

```bash
docker exec -it sustainsutra-mongo mongosh
use sustainsutra
db.users.updateOne(
  {email: "admin@sustainsutra.in"},
  {$set: {role: "admin"}}
)
```

---

### **Option 4: Custom Script to Create Admin**

Let me create a script for you:

#### Step 1: Create the script

Create file `create-admin.js`:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/sustainsutra');
    console.log('✓ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@sustainsutra.in' });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists!');
      console.log('Email: admin@sustainsutra.in');
      console.log('Password: admin123 (if you just created it)');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('SecureAdmin123!', salt);

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@sustainsutra.in',
      password: hashedPassword,
      role: 'admin',
      phone: '+91-8742939191'
    });

    console.log('✓ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    admin@sustainsutra.in');
    console.log('🔒 Password: SecureAdmin123!');
    console.log('👤 Role:     Admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('⚠️ IMPORTANT: Login and change password immediately!');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdmin();
```

#### Step 2: Run the script

```bash
# From backend directory
docker exec -it sustainsutra-backend node /app/create-admin.js

# Or copy script to backend container first
docker cp create-admin.js sustainsutra-backend:/app/
docker exec -it sustainsutra-backend node /app/create-admin.js
```

---

## 🎯 **RECOMMENDED: Quick Fix (Fastest Method)**

### One-Command Solution:

```bash
# Run seeder directly via docker
docker exec -it sustainsutra-backend sh -c "cd /app && npm install && npm run seed"
```

After this runs successfully, login with:
```
Email: admin@sustainsutra.com
Password: admin123
```

---

## 🔍 **Verify Admin User Created**

```bash
# Access MongoDB
docker exec -it sustainsutra-mongo mongosh

# Switch database
use sustainsutra

# List all users
db.users.find({}, {name: 1, email: 1, role: 1, _id: 0})

# Should show:
# { name: "Admin User", email: "admin@sustainsutra.com", role: "admin" }
```

---

## ⚠️ **After Creating Admin - CHANGE PASSWORD IMMEDIATELY!**

1. Login with credentials
2. Go to Profile / Settings
3. Change password to something secure
4. Update email if needed

---

## 🚨 **If Nothing Works - Full Reset**

```bash
# Stop all containers
docker-compose -f docker-compose.prod.yml down

# Remove volumes (WARNING: Deletes all data)
docker volume rm sustainsutra-mongo-data sustainsutra-uploads-data

# Restart containers
docker-compose -f docker-compose.prod.yml up -d

# Wait for startup, then run seeder
docker exec -it sustainsutra-backend sh -c "cd /app && npm run seed"
```

---

## 📞 **Need Help?**

If you're still having issues:

1. **Check backend logs**: `docker logs sustainsutra-backend`
2. **Check MongoDB logs**: `docker logs sustainsutra-mongo`
3. **Verify database connection**: `curl http://localhost:5000/api/health`
4. **Contact support**: info@sustainsutra.in / +91-8742939191

---

**Choose Option 2 (Run Seeder)** - it's the simplest and most reliable! ✅
