# SustainSutra - ESG Advisory & NetZero Strategy Platform

![License](https://img.shields.io/badge/license-Proprietary-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![Status](https://img.shields.io/badge/status-Production%20Ready-success)

> **Professional ESG advisory platform offering Carbon Footprint Analysis, ISO 14064 Verification, and BRSR Consulting services.**

---

## 🌟 **Features**

- **GHG Audit Engine**: ISO 14064-1 compliant carbon calculator with Scope 1, 2, and 3 emissions tracking
- **Payment Integration**: Secure report generation with configurable pricing
- **Admin Dashboard**: Complete control over users, content, emission factors, and payment settings
- **Course Academy**: Sustainability training and certification programs
- **Resource Center**: Templates, glossaries, case studies, and regulatory updates
- **Appointment Booking**: Client consultation scheduling system
- **Blog & Insights**: SEO-optimized content management system

---

## 🚀 **Quick Start**

### Prerequisites
- **Node.js** 18+ and npm
- **MongoDB** 5+ (or use Demo Mode)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/amitkr64/sustainsutra.git
cd sustainsutra

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### Environment Setup

#### Backend (.env)
Create `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sustainsutra
JWT_SECRET=your_super_secret_jwt_key_change_this
```

#### Frontend (Vite Proxy)
The frontend automatically proxies API requests to `http://localhost:5000` via `vite.config.js`.

---

## 🏃 **Running the Application**

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Access the application at: **http://localhost:3000**

### Demo Mode (No MongoDB Required)
If MongoDB is unavailable, the backend automatically switches to **Demo Mode**:
- ✅ In-memory user storage
- ✅ Full authentication flow
- ⚠️ Data resets on server restart

---

## 📦 **Production Build**

```bash
# Build frontend
npm run build

# Preview production build
npm run preview

# Start backend in production
cd backend
npm start
```

---

## 🐳 **Docker Deployment**

```bash
# Start all services (Frontend + Backend + MongoDB)
docker compose up -d

# Access the application
http://localhost:8081
```

### Docker Services
- **Frontend**: Port 8081 (Nginx)
- **Backend**: Port 5000 (Express API)
- **MongoDB**: Port 27017

---

## 🛠️ **Tech Stack**

### Frontend
- **React 18** with React Router
- **Tailwind CSS** + Framer Motion
- **Radix UI** components
- **Vite** build tool

### Backend
- **Node.js** + Express
- **MongoDB** + Mongoose ODM
- **JWT** authentication
- **Bcrypt** password hashing

---

## 📂 **Project Structure**

```
sustainsutra/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Route-specific pages
│   ├── context/           # React Context providers
│   ├── services/          # API integration layer
│   ├── styles/            # Global CSS
│   └── main.jsx           # Application entry point
├── backend/
│   ├── controllers/       # Request handlers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API route definitions
│   ├── middleware/        # Auth & error handling
│   └── server.js          # Express server
├── docker-compose.yml
└── package.json
```

---

## 🎯 **Key API Endpoints**

### Authentication
- `POST /api/users` - Register
- `POST /api/users/login` - Login
- `GET /api/users/me` - Get current user (Protected)

### Blog
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog (Admin)
- `PUT /api/blogs/:id` - Update blog (Admin)

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get all appointments (Admin)

---

## 🧪 **Testing**

```bash
# Run linter
npm run lint

# Run tests (when implemented)
npm test
```

---

##⚙️ **Configuration**

### Payment Settings
Admins can configure report pricing via:
1. Login as admin
2. Navigate to `/admin`
3. Go to **Payments** tab
4. Set report fee and payment gateway credentials

### Emission Factors
Manage standard emission factors:
1. Admin Dashboard → **Emission Factors** tab
2. Add/Edit/Delete custom factors by scope

---

## 📝 **Contributing**

This is a proprietary project. For development queries:
- **Email**: info@sustainsutra.in
- **Phone**: +91-8742939191

---

## 🔒 **Security**

- ✅ JWT-based authentication
- ✅ Password hashing with Bcrypt
- ✅ CORS enabled
- ✅ Helmet security headers
- ⚠️ Use HTTPS in production

---

## 📊 **Monitoring**

- Health check: `GET /api/health`
- Server logs: Console (Development) / Winston (Production)

---

## 🐛 **Known Issues & Limitations**

1. **Demo Mode**: Data is not persisted (requires MongoDB for production)
2. **Payment Gateway**: Mock integration (requires real Razorpay/Stripe keys)
3. **Email Notifications**: Not implemented yet

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for the full technical roadmap.

---

## 📜 **License**

Proprietary © 2026 SustainSutra. All rights reserved.

---

## 👥 **Team**

Developed by the SustainSutra Engineering Team  
**Location**: Ghaziabad, Uttar Pradesh, India

---

**Built with ❤️ for a sustainable future**
