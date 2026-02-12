import { Helmet } from 'react-helmet';

const SEOMeta = ({
    title = 'SustainSutra - ESG Advisory & NetZero Strategy',
    description = 'Leading ESG Advisory firm offering Carbon Footprint Analysis, ISO 14064 Verification, BRSR Consulting, and comprehensive sustainability solutions.',
    keywords = 'ESG advisory, Carbon Footprint Analysis, ISO 14064, BRSR Consulting, NetZero strategy, Sustainability reporting, GHG accounting',
    ogTitle,
    ogDescription,
    ogImage = '/og-image.png',
    ogType = 'website',
    twitterCard = 'summary_large_image',
    canonicalUrl,
    schema,
    noIndex = false,
    locale = 'en_US'
}) => {
    const siteUrl = import.meta.env.VITE_APP_URL || 'https://sustainsutra.in';
    const fullUrl = canonicalUrl || siteUrl + window.location.pathname;

    // Structured data (JSON-LD)
    const defaultSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'SustainSutra',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description: description,
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'F-853, Gaur Siddhartham',
            addressLocality: 'Ghaziabad',
            addressRegion: 'Uttar Pradesh',
            postalCode: '201015',
            addressCountry: 'IN'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-8742939191',
            contactType: 'customer service',
            email: 'info@sustainsutra.in'
        },
        sameAs: [
            'https://www.linkedin.com/in/amit-kumar-42a79927/'
        ]
    };

    const finalSchema = schema || defaultSchema;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            {noIndex && <meta name="robots" content="noindex, nofollow" />}

            {/* Canonical URL */}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph Tags */}
            <meta property="og:title" content={ogTitle || title} />
            <meta property="og:description" content={ogDescription || description} />
            <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : siteUrl + ogImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={ogType} />
            <meta property="og:locale" content={locale} />
            <meta property="og:site_name" content="SustainSutra" />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={ogTitle || title} />
            <meta name="twitter:description" content={ogDescription || description} />
            <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : siteUrl + ogImage} />
            <meta name="twitter:site" content="@SustainSutra" />

            {/* Additional Meta Tags */}
            <meta name="author" content="SustainSutra" />
            <meta name="theme-color" content="#c9a227" />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(finalSchema)}
            </script>
        </Helmet>
    );
};

// SEO configurations for different pages
export const SEOConfig = {
    home: {
        title: 'SustainSutra - ESG Advisory & NetZero Strategy Platform',
        description: 'Professional ESG advisory platform offering Carbon Footprint Analysis, ISO 14064 Verification, and BRSR Consulting services.',
        keywords: 'ESG advisory, Carbon Footprint Analysis, ISO 14064, BRSR Consulting, NetZero strategy'
    },
    carbonCalculator: {
        title: 'Carbon Footprint Calculator | SustainSutra',
        description: 'Calculate your carbon footprint with our ISO 14064 compliant calculator. Track Scope 1, 2, and 3 emissions.',
        keywords: 'carbon calculator, carbon footprint, GHG emissions, Scope 1, Scope 2, Scope 3, ISO 14064'
    },
    brsrAnalysis: {
        title: 'BRSR Analysis Dashboard | SustainSutra',
        description: 'Comprehensive BRSR (Business Responsibility and Sustainability Reporting) analysis and visualization platform.',
        keywords: 'BRSR, Business Responsibility and Sustainability Reporting, ESG analysis, SEBI BRSR'
    },
    ccts: {
        title: 'CCTS Compliance Management | SustainSutra',
        description: 'Carbon Credit Trading Scheme compliance management for entities and verifiers.',
        keywords: 'CCTS, Carbon Credit Trading Scheme, BEE, carbon compliance, monitoring reporting'
    },
    courses: {
        title: 'Sustainability Academy | SustainSutra',
        description: 'Online courses on ESG, carbon accounting, sustainability reporting, and climate change.',
        keywords: 'ESG courses, sustainability training, carbon accounting course, ISO 14064 training'
    },
    insights: {
        title: 'ESG Insights & Resources | SustainSutra',
        description: 'Latest insights, articles, and resources on ESG, sustainability, climate change, and corporate responsibility.',
        keywords: 'ESG insights, sustainability blog, climate change articles, corporate responsibility'
    },
    contact: {
        title: 'Contact Us | SustainSutra',
        description: 'Get in touch with our ESG advisory experts. Book a consultation for sustainability services.',
        keywords: 'ESG consultation, contact, appointment, sustainability advisory'
    }
};

export default SEOMeta;
