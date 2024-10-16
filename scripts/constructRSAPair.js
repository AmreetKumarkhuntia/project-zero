import { generateKeyPairSync } from "crypto";
import { writeFileSync, readFileSync, existsSync } from "fs";
import path from "path";
import dotenv from "dotenv";

const __dirname = "./";

// Load the existing .env file if it exists
const envPath = path.join(__dirname, ".env");

if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Generate RSA key pair
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048, // Length of key
  publicKeyEncoding: {
    type: "pkcs1", // "Public Key Cryptography Standards 1"
    format: "pem", // Format: PEM
  },
  privateKeyEncoding: {
    type: "pkcs1", // Same standard
    format: "pem", // Format: PEM
  },
});

// Prepare new env variables, escaping newlines for better formatting in .env file
const newEnvContent = `PUBLIC_KEY="${publicKey.replace(/\n/g, "\\n")}"
PRIVATE_KEY="${privateKey.replace(/\n/g, "\\n")}"`;

// Read existing .env content
let existingEnvContent = "";
if (existsSync(envPath)) {
  existingEnvContent = readFileSync(envPath, { encoding: "utf8" });
}

// Merge the existing and new environment variables, replacing existing keys if present
const mergedEnvContent = existingEnvContent
  .split("\n")
  .filter(line => !line.startsWith("PUBLIC_KEY") && !line.startsWith("PRIVATE_KEY"))
  .join("\n")
  .concat("\n", newEnvContent);

// Write the updated .env file
writeFileSync(envPath, mergedEnvContent, { encoding: "utf8" });

console.log(`RSA keys have been written to ${envPath}`);
