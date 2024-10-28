#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Paths for the template and target env files
const exampleEnvPath = path.join(process.cwd(), 'example.env');
const targetEnvPath = path.join(process.cwd(), '.env');

// Function to parse env files into key-value objects
function parseEnv(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))
    .reduce((acc, line) => {
      const [key, ...value] = line.split('=');
      acc[key.trim()] = value.join('=').trim();
      return acc;
    }, {});
}

// Function to update or create the .env file
function createOrUpdateEnvFile() {
  try {
    const exampleEnv = parseEnv(exampleEnvPath);
    let targetEnv = {};

    if (fs.existsSync(targetEnvPath)) {
      targetEnv = parseEnv(targetEnvPath);
      console.log('\x1b[33m.env file exists. Adding missing keys...\x1b[0m');
    }

    const mergedEnv = { ...exampleEnv, ...targetEnv }; // Keep existing keys in targetEnv

    const newEnvContent = Object.entries(mergedEnv)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    fs.writeFileSync(targetEnvPath, newEnvContent);
    console.log('\x1b[32m✅ .env file updated successfully!\x1b[0m');
  } catch (error) {
    console.error(
      `\x1b[31m❌ Error updating .env file: ${error.message}\x1b[0m`
    );
    process.exit(1);
  }
}

createOrUpdateEnvFile();
