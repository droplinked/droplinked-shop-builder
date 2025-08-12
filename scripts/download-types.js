#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const CONFIG = {
  // API endpoint - update this to match your backend URL
  API_BASE_URL: process.env.API_BASE_URL || 'http://127.0.0.1:80',
  TYPES_ENDPOINT: '/api/types',
  
  // Frontend project paths - update these to match your frontend structure
  FRONTEND_TYPES_DIR: process.env.FRONTEND_TYPES_DIR || './src/services/types',
  TYPES_FILENAME: 'api-types.ts',
  
  // Backup settings
  CREATE_BACKUP: true,
  BACKUP_DIR: './src/services/types-backup',
  
  // HTTP settings
  TIMEOUT: 30000, // 30 seconds
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  console.error(`${colors.red}ERROR: ${message}${colors.reset}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✓ ${message}${colors.reset}`);
}

function logInfo(message) {
  console.log(`${colors.blue}ℹ ${message}${colors.reset}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠ ${message}${colors.reset}`);
}

// Utility functions
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`Created directory: ${dirPath}`, 'cyan');
  }
}

function createBackup(typesContent, backupPath) {
  if (!CONFIG.CREATE_BACKUP) return;
  
  try {
    ensureDirectoryExists(CONFIG.BACKUP_DIR);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(CONFIG.BACKUP_DIR, `types-backup-${timestamp}.ts`);
    
    fs.writeFileSync(backupFile, typesContent);
    log(`Backup created: ${backupFile}`, 'cyan');
    return backupFile;
  } catch (error) {
    logWarning(`Failed to create backup: ${error.message}`);
  }
}

function downloadTypes() {
  return new Promise((resolve, reject) => {
    const url = `${CONFIG.API_BASE_URL}${CONFIG.TYPES_ENDPOINT}`;
    const protocol = url.startsWith('https:') ? https : http;
    
    log(`Downloading types from: ${url}`, 'blue');
    
    const request = protocol.get(url, {
      timeout: CONFIG.TIMEOUT,
      headers: {
        'User-Agent': 'types-downloader/1.0.0',
        'Accept': 'application/json',
      }
    }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }
      
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          if (jsonData.types) {
            resolve(jsonData.types);
          } else {
            reject(new Error('No types found in API response'));
          }
        } catch (error) {
          reject(new Error(`Failed to parse JSON response: ${error.message}`));
        }
      });
    });
    
    request.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
    
    request.setTimeout(CONFIG.TIMEOUT);
  });
}

function updateTypesFile(typesContent) {
  const typesFilePath = path.join(CONFIG.FRONTEND_TYPES_DIR, CONFIG.TYPES_FILENAME);
  
  // Check if types file exists and create backup
  if (fs.existsSync(typesFilePath)) {
    const existingContent = fs.readFileSync(typesFilePath, 'utf8');
    createBackup(existingContent, typesFilePath);
  }
  
  // Ensure the types directory exists
  ensureDirectoryExists(CONFIG.FRONTEND_TYPES_DIR);
  
  // Write the new types file
  fs.writeFileSync(typesFilePath, typesContent);
  logSuccess(`Types file updated: ${typesFilePath}`);
  
  return typesFilePath;
}

function validateTypesContent(typesContent) {
  // Basic validation that the content looks like TypeScript
  if (!typesContent.includes('export const') || !typesContent.includes('z.enum')) {
    throw new Error('Downloaded content does not appear to be valid TypeScript types');
  }
  
  // Check for common Zod patterns
  if (!typesContent.includes('import { z } from \'zod\'')) {
    logWarning('Content may not be valid Zod schema types');
  }
  
  return true;
}

function generateIndexFile() {
  const indexPath = path.join(CONFIG.FRONTEND_TYPES_DIR, 'index.ts');
  const typesFile = CONFIG.TYPES_FILENAME.replace('.ts', '');
  
  const indexContent = `// Auto-generated index file for types
// Generated at: ${new Date().toISOString()}

export * from './${typesFile}';
`;

  fs.writeFileSync(indexPath, indexContent);
  logSuccess(`Index file generated: ${indexPath}`);
}

function updatePackageJson() {
  const packageJsonPath = './package.json';
  
  if (!fs.existsSync(packageJsonPath)) {
    logWarning('package.json not found, skipping script addition');
    return;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    
    // Add download-types script if it doesn't exist
    if (!packageJson.scripts['download-types']) {
      packageJson.scripts['download-types'] = 'node scripts/download-types.js';
      packageJson.scripts['types:update'] = 'node scripts/download-types.js';
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      logSuccess('Added download-types script to package.json');
    }
  } catch (error) {
    logWarning(`Failed to update package.json: ${error.message}`);
  }
}

function showUsage() {
  log('Types Downloader Script', 'bright');
  log('=======================', 'bright');
  log('');
  log('Usage:', 'yellow');
  log('  node scripts/download-types.js [options]', 'cyan');
  log('');
  log('Options:', 'yellow');
  log('  --help, -h          Show this help message', 'cyan');
  log('  --no-backup         Skip creating backup files', 'cyan');
  log('  --api-url <url>     Custom API base URL', 'cyan');
  log('  --output-dir <dir>  Custom output directory', 'cyan');
  log('');
  log('Environment Variables:', 'yellow');
  log('  API_BASE_URL        API base URL (default: http://127.0.0.1:80)', 'cyan');
  log('  FRONTEND_TYPES_DIR  Output directory (default: ./src/services/types)', 'cyan');
  log('');
  log('Examples:', 'yellow');
  log('  node scripts/download-types.js', 'cyan');
  log('  node scripts/download-types.js --api-url https://api.example.com', 'cyan');
  log('  node scripts/download-types.js --output-dir ./src/services/types --no-backup', 'cyan');
  log('');
}

function parseArguments() {
  const args = process.argv.slice(2);
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--help':
      case '-h':
        showUsage();
        process.exit(0);
        break;
        
      case '--no-backup':
        CONFIG.CREATE_BACKUP = false;
        break;
        
      case '--api-url':
        if (i + 1 < args.length) {
          CONFIG.API_BASE_URL = args[++i];
        } else {
          logError('--api-url requires a URL value');
          process.exit(1);
        }
        break;
        
      case '--output-dir':
        if (i + 1 < args.length) {
          CONFIG.FRONTEND_TYPES_DIR = args[++i];
        } else {
          logError('--output-dir requires a directory path');
          process.exit(1);
        }
        break;
        
      default:
        logError(`Unknown argument: ${arg}`);
        showUsage();
        process.exit(1);
    }
  }
}

async function main() {
  try {
    log('Starting types download...', 'bright');
    
    // Parse command line arguments
    parseArguments();
    
    // Show configuration
    logInfo(`API Base URL: ${CONFIG.API_BASE_URL}`);
    logInfo(`Output Directory: ${CONFIG.FRONTEND_TYPES_DIR}`);
    logInfo(`Backup Enabled: ${CONFIG.CREATE_BACKUP}`);
    
    // Download types from API
    const typesContent = await downloadTypes();
    logSuccess('Types downloaded successfully');
    
    // Validate the content
    validateTypesContent(typesContent);
    logSuccess('Types content validated');
    
    // Update the types file
    const updatedFilePath = updateTypesFile(typesContent);
    
    // Generate index file
    generateIndexFile();
    
    // Update package.json with script
    updatePackageJson();
    
    log('');
    logSuccess('Types update completed successfully!');
    logInfo(`Types file: ${updatedFilePath}`);
    logInfo('You can now import types in your frontend code:');
    log('  import { User, ProductV2 } from \'./types\';', 'cyan');
    log('');
    logInfo('To update types in the future, run:');
    log('  npm run download-types', 'cyan');
    log('  or', 'cyan');
    log('  npm run types:update', 'cyan');
    
  } catch (error) {
    logError(`Failed to download types: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  downloadTypes,
  updateTypesFile,
  createBackup,
  validateTypesContent,
};
