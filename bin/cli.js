#!/usr/bin/env node

/**
 * Real-time Chat Application CLI
 * Provides command-line interface for managing the chat application
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const command = args[0];

const rootDir = path.join(__dirname, '..');
const serverPath = path.join(rootDir, 'server', 'server.js');

function printHelp() {
  console.log(`
?????????????????????????????????????????????????????????????
?      Real-time Chat Application v0.1.0                    ?
?????????????????????????????????????????????????????????????

Usage: realtime-chat <command> [options]

Commands:
  start           Start the chat server
  dev             Start the server in development mode
  test            Run all tests
  help            Show this help message
  version         Show version information
  setup           Initialize configuration files

Examples:
  $ realtime-chat start
  $ realtime-chat dev
  $ realtime-chat test
  $ realtime-chat setup

Environment Variables:
  PORT            Server port (default: 5000)
  MONGODB_URI     MongoDB connection string
  JWT_SECRET      Secret key for JWT tokens
  NODE_ENV        Environment (development/production)

Documentation:
  https://github.com/Anoop-2024si96509/Realtime-chat-app

`);
}

function printVersion() {
  const packageJson = require('../package.json');
  console.log(`
Real-time Chat Application
Version: ${packageJson.version}
Node: ${process.version}
  `);
}

function setupEnv() {
  const envPath = path.join(rootDir, '.env');
  const envExamplePath = path.join(rootDir, '.env.example');
  
  if (fs.existsSync(envPath)) {
    console.log('? .env file already exists');
    return;
  }
  
  const envTemplate = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/realtime-chat
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:3000
`;
  
  fs.writeFileSync(envPath, envTemplate);
  console.log('? Created .env file with default configuration');
  console.log('??  Please update JWT_SECRET and MONGODB_URI in .env file');
}

function startServer(isDev = false) {
  console.log(`?? Starting Real-time Chat Server ${isDev ? '(development mode)' : ''}...`);
  
  const nodeArgs = isDev ? ['--watch', serverPath] : [serverPath];
  const serverProcess = spawn('node', nodeArgs, {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  serverProcess.on('error', (err) => {
    console.error('? Failed to start server:', err.message);
    process.exit(1);
  });
  
  serverProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`? Server exited with code ${code}`);
      process.exit(code);
    }
  });
}

function runTests() {
  console.log('?? Running tests...');
  
  const testProcess = spawn('npm', ['test'], {
    cwd: rootDir,
    stdio: 'inherit'
  });
  
  testProcess.on('close', (code) => {
    process.exit(code);
  });
}

// Main command handler
switch (command) {
  case 'start':
    startServer(false);
    break;
    
  case 'dev':
    startServer(true);
    break;
    
  case 'test':
    runTests();
    break;
    
  case 'setup':
    setupEnv();
    break;
    
  case 'version':
  case '-v':
  case '--version':
    printVersion();
    break;
    
  case 'help':
  case '-h':
  case '--help':
  case undefined:
    printHelp();
    break;
    
  default:
    console.error(`? Unknown command: ${command}`);
    console.log('Run "realtime-chat help" for usage information');
    process.exit(1);
}
