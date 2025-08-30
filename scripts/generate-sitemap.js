#!/usr/bin/env node

/**
 * Script to generate sitemap.xml files for different environments
 * Usage: node scripts/generate-sitemap.js [environment]
 * Environment can be: dev, stage, main (defaults to main)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment from command line argument or default to 'main'
const environment = process.argv[2] || process.env.ENVIRONMENT || 'main';

console.log(`Checking sitemap generation for environment: ${environment}`);

// Only generate sitemap for main/production environment
if (environment === 'dev' || environment === 'stage') {
    console.log(`⚠️  Skipping sitemap generation for ${environment} environment`);
    console.log('   Reason: Dev and stage environments should not be indexed by search engines');
    console.log('   Only main/production environment gets a sitemap for SEO purposes');
    process.exit(0);
}

console.log(`✅ Proceeding with sitemap generation for ${environment} environment`);

// Define route priorities and change frequencies
const getRouteConfig = (route) => {
    // Home page - highest priority
    if (route === '/') {
        return { priority: '1.0', changefreq: 'weekly' };
    }

    // Landing pages - very high priority (marketing focused)
    const landingPages = [
        '/physical-inventory',
        '/digital-goods',
        '/products-on-demand',
        '/tokenpay',
        '/payment-links',
        '/product-tiles',
        '/tokenizing-products',
        '/onchain-subscriptions',
        '/custom-tokens',
        '/metaverse-store',
        '/book-demo',
        '/onchain-affiliate',
        '/roi',
        '/dpp',
        '/plans',
        '/rewards'
    ];
    if (landingPages.includes(route)) {
        return { priority: '0.9', changefreq: 'monthly' };
    }

    // Partner pages - high priority
    const partnerPages = [
        '/d3',
        '/unstoppable-domains',
        '/polygon',
        '/crossmint',
        '/gaia',
        '/base'
    ];
    if (partnerPages.includes(route)) {
        return { priority: '0.8', changefreq: 'monthly' };
    }

    // Main public pages - medium-high priority
    const mainPages = [
        '/about',
        '/contact-us',
        '/explore',
        '/blogs',
        '/affiliate/products'
    ];
    if (mainPages.includes(route)) {
        return { priority: '0.7', changefreq: 'monthly' };
    }

    // Legal and support pages - medium priority
    const legalPages = [
        '/terms',
        '/privacy',
        '/enquiry'
    ];
    if (legalPages.includes(route)) {
        return { priority: '0.5', changefreq: 'yearly' };
    }

    // Default for other pages
    return { priority: '0.5', changefreq: 'monthly' };
};

// Generate sitemap XML structure (only for main/production)
const generateSitemap = () => {
    const baseUrl = 'https://droplinked.com'; // Only main/production URL
    const currentDate = new Date().toISOString().split('T')[0];

    // Public routes from your routes.ts (excluding protected routes)
    const publicRoutes = [
        '/',
        '/enquiry',
        '/terms',
        '/about',
        '/contact-us',
        '/privacy',
        '/physical-inventory',
        '/digital-goods',
        '/products-on-demand',
        '/tokenpay',
        '/payment-links',
        '/product-tiles',
        '/tokenizing-products',
        '/onchain-subscriptions',
        '/custom-tokens',
        '/metaverse-store',
        '/book-demo',
        '/d3',
        '/unstoppable-domains',
        '/polygon',
        '/crossmint',
        '/gaia',
        '/base',
        '/onchain-affiliate',
        '/roi',
        '/dpp',
        '/plans',
        '/rewards',
        '/explore',
        '/blogs',
        '/affiliate/products'
    ];

    // Generate URL entries (all routes for production)
    const urlEntries = publicRoutes
        .map(route => {
            const config = getRouteConfig(route);
            return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>`;
        })
        .join('\n');

    // Complete sitemap XML
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;
};

// Generate the sitemap content
const sitemapContent = generateSitemap();// Determine output path - public directory
const publicDir = path.join(path.dirname(__dirname), 'public');

// Write sitemap.xml to public directory
const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(publicSitemapPath, sitemapContent);
console.log(`✅ Generated sitemap.xml in public directory: ${publicSitemapPath}`);

// Also generate a readable summary
const routeCount = (sitemapContent.match(/<url>/g) || []).length;
console.log(`📊 Sitemap Statistics:`);
console.log(`   - Total URLs: ${routeCount}`);
console.log(`   - Environment: ${environment}`);
console.log(`   - Base URL: https://droplinked.com`);

console.log('\nSitemap.xml generation completed successfully!');
