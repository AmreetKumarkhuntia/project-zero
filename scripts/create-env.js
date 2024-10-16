#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Paths for the template and target env files
const exampleEnvPath = path.join(process.cwd(), 'example.env');
const targetEnvPath = path.join(process.cwd(), '.env');

// Function to copy example.env to .env
function createEnvFile() {
    try {
        if (fs.existsSync(targetEnvPath)) {
            console.log('\x1b[33m.env file already exists. Skipping creation.\x1b[0m');
            return;
        }

        fs.copyFileSync(exampleEnvPath, targetEnvPath);
        console.log('\x1b[32m✅ .env file created successfully from example.env!\x1b[0m');
    } catch (error) {
        console.error(`\x1b[31m❌ Error creating .env file: ${error.message}\x1b[0m`);
        process.exit(1);
    }
}

createEnvFile();
