const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');
const Course = require('../models/courseModel');
const Resource = require('../models/resourceModel');

/**
 * Builds an absolute URL using the configured site origin. Falls back to
 * FRONTEND_URL, then a sensible default. Never throws.
 */
const siteUrl = () => {
    const base =
        process.env.SITE_URL ||
        process.env.FRONTEND_URL ||
        'https://sustainsutra.in';
    return base.replace(/\/$/, ''); // trim trailing slash
};

/**
 * Escapes a URL for safe inclusion in XML.
 */
const escapeXml = (str) =>
    String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

const urlEntry = (loc, lastmod, changefreq = 'weekly', priority = '0.7') => {
    let entry = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n`;
    if (lastmod) entry += `    <lastmod>${lastmod}</lastmod>\n`;
    entry += `    <changefreq>${changefreq}</changefreq>\n`;
    entry += `    <priority>${priority}</priority>\n  </url>`;
    return entry;
};

/**
 * @desc    Generate a dynamic sitemap.xml
 * @route   GET /sitemap.xml
 * @access  Public
 *
 * Pulls published blogs, published courses, and public case-study resources so
 * the sitemap stays current without manual maintenance. Falls back to static
 * routes if the DB is unavailable (demo mode / DB outage).
 */
const getSitemap = asyncHandler(async (req, res) => {
    const base = siteUrl();
    const today = new Date().toISOString().split('T')[0];
    const urls = [];

    // --- Static high-priority pages ---
    const staticRoutes = [
        ['/', '1.0', 'daily'],
        ['/services', '0.9', 'weekly'],
        ['/services/carbon-footprinting', '0.8', 'monthly'],
        ['/services/ghg-mapping', '0.8', 'monthly'],
        ['/services/esg-strategy', '0.8', 'monthly'],
        ['/services/brsr-reporting', '0.8', 'monthly'],
        ['/services/iso-verification', '0.8', 'monthly'],
        ['/services/training-capacity', '0.8', 'monthly'],
        ['/services/energy-audits', '0.8', 'monthly'],
        ['/services/waste-management', '0.8', 'monthly'],
        ['/services/circular-economy', '0.8', 'monthly'],
        ['/services/epr', '0.8', 'monthly'],
        ['/services/cleaner-production', '0.8', 'monthly'],
        ['/services/resource-efficiency', '0.8', 'monthly'],
        ['/services/water-wastewater', '0.8', 'monthly'],
        ['/services/carbon-markets', '0.8', 'monthly'],
        ['/carbon-calculator', '0.9', 'monthly'],
        ['/courses', '0.9', 'weekly'],
        ['/insights', '0.9', 'daily'],
        ['/about', '0.7', 'monthly'],
        ['/our-approach', '0.7', 'monthly'],
        ['/resources', '0.8', 'weekly'],
        ['/resources/glossary', '0.6', 'monthly'],
        ['/resources/templates', '0.6', 'monthly'],
        ['/resources/case-studies', '0.7', 'weekly'],
        ['/resources/reports', '0.6', 'monthly'],
        ['/resources/regulatory-updates', '0.6', 'weekly'],
        ['/showcase', '0.7', 'monthly'],
        ['/book-appointment', '0.7', 'monthly'],
    ];
    staticRoutes.forEach(([path, priority, freq]) => {
        urls.push(urlEntry(`${base}${path}`, today, freq, priority));
    });

    // --- Dynamic: published blogs ---
    try {
        const blogs = await Blog.find({ status: 'published' })
            .select('slug updatedAt')
            .sort('-updatedAt')
            .lean();
        blogs.forEach((b) => {
            urls.push(
                urlEntry(
                    `${base}/insights/${b.slug}`,
                    b.updatedAt ? b.updatedAt.toISOString().split('T')[0] : today,
                    'weekly',
                    '0.7'
                )
            );
        });
    } catch {
        // DB unavailable — skip dynamic entries.
    }

    // --- Dynamic: published courses ---
    try {
        const courses = await Course.find({ published: true })
            .select('slug updatedAt')
            .sort('-updatedAt')
            .lean();
        courses.forEach((c) => {
            urls.push(
                urlEntry(
                    `${base}/courses/${c.slug}`,
                    c.updatedAt ? c.updatedAt.toISOString().split('T')[0] : today,
                    'weekly',
                    '0.8'
                )
            );
        });
    } catch {
        // DB unavailable.
    }

    // --- Dynamic: public case studies ---
    try {
        const studies = await Resource.find({ type: 'case-study' })
            .sort('-date')
            .lean();
        studies.forEach((s) => {
            urls.push(urlEntry(`${base}/resources/case-studies/${s._id}`, today, 'monthly', '0.6'));
        });
    } catch {
        // DB unavailable.
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600'); // cache 1 hour at CDN/proxy
    res.send(xml);
});

/**
 * @desc    Serve robots.txt dynamically (so the Sitemap directive uses the
 *          correct absolute URL in any environment)
 * @route   GET /robots.txt
 * @access  Public
 */
const getRobots = (req, res) => {
    const base = siteUrl();
    const body = `# SustainSutra — ESG Advisory & NetZero Strategy
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /profile
Disallow: /ccts/dashboard
Disallow: /ccts/monitoring-data
Disallow: /ccts/verification
Disallow: /my-courses
Disallow: /courses/*/learn

Sitemap: ${base}/sitemap.xml
`;
    res.set('Content-Type', 'text/plain');
    res.send(body);
};

module.exports = {
    getSitemap,
    getRobots,
};
