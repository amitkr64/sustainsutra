// PM2 process definition for SustainSutra on a Hostinger VPS.
//
//   npm i -g pm2
//   cd /var/www/sustainsutra/backend && npm ci --omit=dev
//   pm2 start ../deploy/hostinger/ecosystem.config.js
//   pm2 save && pm2 startup   # survive reboots
//
// The optional portals run the same way from brsr-portal/backend and
// ccts-portal/backend — uncomment after editing their .env files.

module.exports = {
    apps: [
        {
            name: 'sustainsutra-api',
            cwd: '/var/www/sustainsutra/backend',
            script: 'server.js',
            instances: 1,
            exec_mode: 'fork',
            max_memory_restart: '512M',
            env: {
                NODE_ENV: 'production',
            },
        },
        // {
        //     name: 'brsr-portal-api',
        //     cwd: '/var/www/sustainsutra/brsr-portal/backend',
        //     script: 'server.js',
        //     env: { NODE_ENV: 'production', PORT: 5101 },
        // },
        // {
        //     name: 'ccts-portal-api',
        //     cwd: '/var/www/sustainsutra/ccts-portal/backend',
        //     script: 'server.js',
        //     env: { NODE_ENV: 'production', PORT: 5201 },
        // },
    ],
};
