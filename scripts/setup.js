#!/usr/bin/env node

import { execSync } from 'child_process';

// ANSI escape codes for styling
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
};

const separator = `${colors.cyan}\n------------------------------\n${colors.reset}`;

const runCommand = (command) => {
    console.log(`${separator} \n`);
    try {
        console.log(`\x1b[36mRunning: ${command}\x1b[0m`);
        execSync(command, { stdio: 'inherit' });
        console.log('\x1b[32m✅ Command completed successfully!\x1b[0m');
    } catch (error) {
        console.error(`\x1b[31m❌ Error running command: ${error.message}\x1b[0m`);
        process.exit(1);
    }
    console.log(`${separator} \n`);
};

// Define commands as an array
// TODO: add other commands
const commands = [
    'npm run setup:env',            // to setup env
];

// Run each command in sequence
commands.forEach(runCommand);
