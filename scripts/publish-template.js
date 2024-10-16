#!/usr/bin/env node

import { execSync } from 'child_process';

const projectName = process.argv[2] || 'project-zero'; // Get project name from command line arguments

try {
    console.log(`Creating a new Svelte project: ${projectName}...`);
    // Execute the degit command to clone your template repository
    execSync(`npx degit AmreetKumarkhuntia/project-zero ${projectName}`, { stdio: 'inherit' });

    console.log(`\n🎉 Project ${projectName} created successfully!`);
    console.log(`\nRun the following to get started:`);
    console.log(`cd ${projectName} && npm install && npm run dev`);
} catch (error) {
    console.error(`Error creating project: ${error.message}`);
    process.exit(1); // Exit with a non-zero code on error
}
