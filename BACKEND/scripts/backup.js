import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '../.env' }); // Adjust path to .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupDir = path.join(__dirname, '../backups');

if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

const dbUri = process.env.MONGODB_URI;
// Assuming simple URI for now, parsing logically or using tools if installed.
// Since 'mongodump' requires tools installed on OS, this script assumes they are.
// If Mongo Atlas, URI is complex.

const backupFile = path.join(backupDir, `backup-${new Date().toISOString().replace(/:/g, '-')}.gz`);

console.log(`Starting backup to ${backupFile}...`);

// Simple simulation for now if mongodump not guaranteed
// But writing the logic:
const cmd = `mongodump --uri="${dbUri}" --archive="${backupFile}" --gzip`;

exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.error(`Backup error: ${error.message}`);
        // Log to file
        fs.appendFileSync(path.join(backupDir, 'backup.log'), `${new Date().toISOString()} - ERROR: ${error.message}\n`);
        return;
    }
    console.log(`Backup successful: ${backupFile}`);
     fs.appendFileSync(path.join(backupDir, 'backup.log'), `${new Date().toISOString()} - SUCCESS: ${backupFile}\n`);
});
