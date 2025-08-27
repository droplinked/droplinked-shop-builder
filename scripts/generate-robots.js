#!/usr/bin/env node

/**
 * Script to generate robots.txt files for different environments
 * Usage: node scripts/generate-robots.js [environment]
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

console.log(`Generating robots.txt for environment: ${environment}`);

// Define robots.txt content for different environments
const generateRobotsTxt = (env) => {
    switch (env) {
        case 'dev':
        case 'stage':
            // Block all crawlers on dev and staging environments
            return `# Robots.txt for ${env} environment
# Block all crawlers
User-agent: *
Disallow: /

# Prevent indexing of development/staging sites
Crawl-delay: 86400
`;

        case 'main':
        case 'production':
        case 'prod':
        default:
            // Production configuration - allow indexing
            return `# Robots.txt for production environment
# Allow all crawlers with specific configurations

# Default crawlers
User-agent: *
Allow: /
Disallow: /analytics/
Crawl-delay: 1
Sitemap: https://droplinked.com/sitemap.xml

# Google Bot - optimized for faster product indexing
User-agent: Googlebot
Allow: /
Disallow: /analytics/
Crawl-delay: 0.5

# Bing Bot
User-agent: Bingbot
Allow: /
Disallow: /analytics/
Crawl-delay: 0.8

# Facebook external hit - social media crawlers
User-agent: facebookexternalhit
Allow: /
Disallow: /analytics/
Crawl-delay: 2

# Twitter Bot
User-agent: Twitterbot
Allow: /
Disallow: /analytics/
Crawl-delay: 2

# LinkedIn Bot
User-agent: LinkedInBot
Allow: /
Disallow: /analytics/
Crawl-delay: 2
`;
    }
};

// Generate the robots.txt content
const robotsContent = generateRobotsTxt(environment);

// Determine output paths
const buildDir = path.join(path.dirname(__dirname), 'build');
const publicDir = path.join(path.dirname(__dirname), 'public');

// Ensure build directory exists (it should after build)
if (!fs.existsSync(buildDir)) {
    console.warn('Build directory does not exist. Creating it...');
    fs.mkdirSync(buildDir, { recursive: true });
}

// Write robots.txt to build directory (this will be deployed)
const buildRobotsPath = path.join(buildDir, 'robots.txt');
fs.writeFileSync(buildRobotsPath, robotsContent);
console.log(`✅ Generated robots.txt in build directory: ${buildRobotsPath}`);

// Also update the public directory for development
const publicRobotsPath = path.join(publicDir, 'robots.txt');
fs.writeFileSync(publicRobotsPath, robotsContent);
console.log(`✅ Updated robots.txt in public directory: ${publicRobotsPath}`);

console.log('Robots.txt generation completed successfully!');
console.log('\nGenerated content:');
console.log('='.repeat(50));
console.log(robotsContent);
console.log('='.repeat(50));
