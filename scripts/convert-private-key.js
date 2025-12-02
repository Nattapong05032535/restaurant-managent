#!/usr/bin/env node

/**
 * Helper script to convert private key from JSON format to .env format
 * 
 * Usage:
 *   node scripts/convert-private-key.js <path-to-json-file>
 * 
 * Example:
 *   node scripts/convert-private-key.js ~/Downloads/restaurant-management-xxxxx.json
 */

const fs = require('fs');
const path = require('path');

const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
  console.error('❌ Error: Please provide the path to your JSON key file');
  console.log('\n📖 Usage:');
  console.log('   node scripts/convert-private-key.js <path-to-json-file>');
  console.log('\n📝 Example:');
  console.log('   node scripts/convert-private-key.js ~/Downloads/restaurant-management-xxxxx.json');
  process.exit(1);
}

if (!fs.existsSync(jsonFilePath)) {
  console.error(`❌ Error: File not found: ${jsonFilePath}`);
  process.exit(1);
}

try {
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
  const jsonData = JSON.parse(jsonContent);

  if (!jsonData.client_email || !jsonData.private_key) {
    console.error('❌ Error: Invalid JSON file. Missing client_email or private_key');
    process.exit(1);
  }

  // Convert private key: replace newlines with \n
  const privateKey = jsonData.private_key.replace(/\n/g, '\\n');

  console.log('\n✅ Private key converted successfully!\n');
  console.log('📋 Copy the following to your .env file:\n');
  console.log('─'.repeat(60));
  console.log(`GOOGLE_SERVICE_ACCOUNT_EMAIL=${jsonData.client_email}`);
  console.log(`GOOGLE_PRIVATE_KEY="${privateKey}"`);
  console.log('─'.repeat(60));
  console.log('\n💡 Don\'t forget to:');
  console.log('   1. Add GOOGLE_SPREADSHEET_ID to your .env file');
  console.log('   2. Share your Google Sheet with the Service Account email');
  console.log('   3. Run: cd api && pnpm run create-sheets\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

