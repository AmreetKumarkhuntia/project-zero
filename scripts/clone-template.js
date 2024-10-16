#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// ANSI escape codes for styling
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
};

const separator = `${colors.cyan}\n------------------------------\n${colors.reset}`;

const projectName = process.argv[2] || 'project-zero';
const projectLocation = 'AmreetKumarkhuntia/project-zero';

try {
    console.log(`${separator}${colors.green}Creating a new Svelte project: ${projectName}...${colors.reset}`);

    // Clone the template repository
    execSync(`npx degit ${projectLocation} ${projectName}`, { stdio: 'inherit' });

    const packageJsonPath = path.join(projectName, 'package.json');
    const cloneScriptPath = path.join(projectName, 'clone-template.js'); // Path to the script to be removed

    // Read and update package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    delete packageJson.bin;

    // Write updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log(`${separator}${colors.green}Running setup script...${colors.reset}`);

    // Run npm run setup
    execSync(`cd ${projectName} && npm run setup`, { stdio: 'inherit' });

    // Remove clone-template.js
    if (fs.existsSync(cloneScriptPath)) {
        fs.unlinkSync(cloneScriptPath);
        console.log(`${separator}${colors.green}Removed clone-template.js${colors.reset}`);
    }

    console.log(`${separator}${colors.green}🎉 Project ${projectName} created and setup successfully!${colors.reset}`);
    console.log(`${separator}${colors.yellow}🚀 Get started with the following commands:${colors.reset}`);
    console.log(`${colors.cyan}cd ${projectName} && npm install && npm run dev${colors.reset}`);
} catch (error) {
    console.error(`${colors.red}❌ Error creating project: ${error.message}${colors.reset}`);
    process.exit(1); // Exit with a non-zero code on error
}
