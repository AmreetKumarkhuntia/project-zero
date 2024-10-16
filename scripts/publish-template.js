#!/usr/bin/env node
const { execSync } = require('child_process');

const projectName = 'svelte-project-zero';
execSync(`npx degit AmreetKumarkhuntia/project-zero ${projectName}`, { stdio: 'inherit' });

console.log(`\n🎉 Project ${projectName} created successfully!`);
console.log(`\nRun the following to get started:`);
console.log(`cd ${projectName} && npm install && npm run dev`);
