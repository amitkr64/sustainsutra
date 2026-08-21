# Deploying SustainSutra on Hostinger

The platform has three deployable parts:

| Part | What it is | Host |
|---|---|---|
| **Main site** | Public marketing + content (React SPA `dist/` + Node API + MongoDB) | Hostinger |
| **BRSR portal** | Client workspace (`brsr-portal/`, frontend :3100 / API :5101) | same VPS, optional |
| **CCTS portal** | Client workspace (`ccts-portal/`, frontend :3200 / API :5201) | same VPS, optional |

> Hostinger **shared/web hosting cannot run Node.js or MongoDB**. Choose one:
>
> - **Option A — Hostinger VPS (recommended):** everything runs on one box.
> - **Option B — Shared hosting (static only):** upload `dist/` for the public site, but the API + database must live somewhere that runs Node (a second small VPS, Railway, Render…). Portals are not possible on shared hosting.

---

## Option A — Hostinger VPS (full stack, recommended)

Tested layout: Ubuntu 22.04/24.04 VPS (KVM 2 plan or better), domain `sustainsutra.in` pointed at the VPS IP (A record in hPanel → DNS).

### 1. Server prep (SSH as root)

```bash
adduser deploy && usermod -aG sudo deploy
apt update && apt upgrade -y
apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt install -y nodejs
npm i -g pm2
```

### 2. Get the code

```bash
mkdir -p /var/www/sustainsutra && cd /var/www/sustainsutra
git clone https://github.com/amitkr64/sustainsutra.git .
```

### 3. Database — MongoDB Atlas (free tier)

1. Create a free M0 cluster at <https://cloud.mongodb.com>.
2. Database Access → add user; Network Access → allow the VPS IP.
3. Copy the connection string for `backend/.env` (next step).

(The repo also has an embedded-Mongo fallback, but Atlas is the right choice for production.)

### 4. Configure the backend

```bash
cd /var/www/sustainsutra/backend
npm ci --omit=dev
cp ../deploy/hostinger/env/backend.production.example .env
nano .env        # set MONGO_URI, JWT_SECRET (openssl rand -base64 64), SMTP creds
```

Seed the content (blogs, courses, glossary…):

```bash
ADMIN_EMAIL=you@sustainsutra.in ADMIN_PASSWORD='A_Strong_Password' npm run seed
```

### 5. Build the frontend

```bash
cd /var/www/sustainsutra
npm ci --legacy-peer-deps
npm run build     # output in dist/
```

### 6. Run the API under PM2

```bash
pm2 start deploy/hostinger/ecosystem.config.js
pm2 save && pm2 startup    # follow the printed command to enable boot start
pm2 logs sustainsutra-api  # should show "MongoDB Connected" + port 5000
```

### 7. nginx + SSL

```bash
cp deploy/hostinger/nginx/sustainsutra.conf /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/sustainsutra.conf /etc/nginx/sites-enabled/
nano /etc/nginx/sites-available/sustainsutra.conf   # confirm domain + root path
nginx -t && systemctl reload nginx
apt install -y certbot python3-certbot-nginx
certbot --nginx -d sustainsutra.in -d www.sustainsutra.in
```

### 8. Optional portals (BRSR / CCTS)

```bash
cd /var/www/sustainsutra/brsr-portal/backend && npm ci --omit=dev
cp ../../backend/.env .env && sed -i 's/^PORT=.*/PORT=5101/' .env   # same JWT_SECRET!
cd ../frontend && npm ci --legacy-peer-deps && npm run build
# serve brsr-portal/frontend/dist on a subdomain (e.g. brsr.sustainsutra.in)
# with the same nginx pattern, proxying /api to 127.0.0.1:5101.
# Repeat for ccts-portal (PORT=5201).
```

Then uncomment the portal entries in `ecosystem.config.js` and `pm2 restart all`.

### 9. Go-live checklist

- [ ] `https://sustainsutra.in` loads; hero, services, insights render
- [ ] Sign in works (`/api/users/me` returns your user)
- [ ] `/sitemap.xml` and `/robots.txt` return 200 (served by the API)
- [ ] Admin panel (`/admin`) loads and dashboard stats populate
- [ ] `pm2 status` — all processes online; `pm2 logs` clean
- [ ] Certbot auto-renew: `certbot renew --dry-run`

---

## Option B — Hostinger shared hosting (static frontend only)

1. Build locally: `npm ci --legacy-peer-deps && npm run build`
2. hPanel → File Manager → `public_html` → upload everything inside `dist/`
   (or use the prepared zip: `npm run build && cd dist && zip -r ../deploy/hostinger/sustainsutra-frontend.zip .`)
3. Host the API + MongoDB on any Node host. Then rebuild the frontend with
   `VITE_API_URL=https://your-api-host` and re-upload, and set
   `FRONTEND_URL=https://sustainsutra.in` in the API's `.env` (CORS + cookies).
4. Note: without a Node host on the same domain you lose server-rendered
   sitemap/robots (static copies in `public/` are served instead) and admin
   email flows depend on the remote API host.

---

## Docker alternative (works on any VPS incl. Hostinger)

The repo ships a complete Docker stack — on a Hostinger VPS with Docker:

```bash
apt install -y docker.io docker-compose-plugin
git clone https://github.com/amitkr64/sustainsutra.git && cd sustainsutra
cp .env.example .env   # fill production values
docker compose -f docker-compose.prod.yml up -d --build
```

This runs frontend (nginx) + backend + MongoDB in containers behind port 8085;
put nginx/SSL in front exactly as in Option A.

---

## Where things live

```
deploy/hostinger/
├── DEPLOY-HOSTINGER.md            ← this guide
├── nginx/sustainsutra.conf        ← production nginx vhost (SPA + API proxy + SEO)
├── ecosystem.config.js            ← PM2 process definitions
└── env/backend.production.example ← every production env var, documented
```
