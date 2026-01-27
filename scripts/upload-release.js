import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to use process.env first (e.g. via node --env-file=.env)
let supabaseUrl = process.env.VITE_SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Fallback: Manually parse .env if process.env is missing values
if (!supabaseUrl || !supabaseKey) {
    try {
        const envPath = path.resolve(__dirname, '..', '.env');
        if (fs.existsSync(envPath)) {
            const envFile = fs.readFileSync(envPath, 'utf8');
            envFile.split('\n').forEach(line => {
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    let value = match[2].trim();
                    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }
                    if (key === 'VITE_SUPABASE_URL' && !supabaseUrl) supabaseUrl = value;
                    if (key === 'SUPABASE_SERVICE_ROLE_KEY' && !supabaseKey) supabaseKey = value;
                    if (key === 'VITE_SUPABASE_ANON_KEY' && !supabaseKey) supabaseKey = value; // Fallback to Anon
                }
            });
        }
    } catch (e) {
        console.warn('Warning: Could not read .env file directly:', e.message);
    }
}

if (!supabaseUrl || !supabaseKey) {
    console.error('\nError: Could not load Supabase credentials.');
    console.error('Usage: node --env-file=.env scripts/upload-release.js');
    console.error('Or ensure .env file is readable.');
    process.exit(1);
}

const BUCKET_NAME = 'installers';
const RELEASE_DIR = path.resolve(__dirname, '..', 'release');

async function createBucket() {
    console.log(`Checking/Creating bucket '${BUCKET_NAME}'...`);
    const response = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'apikey': supabaseKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: BUCKET_NAME,
            name: BUCKET_NAME,
            public: true
        })
    });

    if (response.ok) {
        console.log(`Bucket '${BUCKET_NAME}' created.`);
    } else if (response.status === 400) { // Usually "Bucket already exists"
        // Check if it really exists or is another error
        console.log(`Bucket might already exist or error: ${await response.text()}`);
    } else {
        console.error(`Failed to create bucket: ${response.status} ${response.statusText}`);
        console.error(await response.text());
    }
}

async function uploadFile(fileName, contentType) {
    const filePath = path.join(RELEASE_DIR, fileName);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return null;
    }

    const fileStats = fs.statSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    console.log(`Uploading ${fileName} (${(fileStats.size / 1024 / 1024).toFixed(2)} MB)...`);

    // Basic upload (overwrite)
    const response = await fetch(`${supabaseUrl}/storage/v1/object/${BUCKET_NAME}/${fileName}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'apikey': supabaseKey,
            'Content-Type': contentType,
            'x-upsert': 'true'
        },
        body: fileBuffer
    });

    if (!response.ok) {
        if (response.status === 404) {
            console.error(`\n❌ Error: The bucket '${BUCKET_NAME}' was not found.`);
            console.error(`   You must manually create this bucket in your Supabase Dashboard.`);
            console.error(`   1. Go to Storage -> New Bucket`);
            console.error(`   2. Name it: ${BUCKET_NAME}`);
            console.error(`   3. Ensure 'Public bucket' is CHECKED`);
            console.error(`   4. Save and re-run this script.\n`);
            return null;
        }
        console.error(`Error uploading ${fileName}:`, response.status, response.statusText);
        console.error(await response.text());
        return null;
    }

    console.log(`Successfully uploaded ${fileName}`);

    // Construct Public URL
    // Format: https://project-id.supabase.co/storage/v1/object/public/bucket/file
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;

    console.log(`Public URL: ${publicUrl}`);
    return publicUrl;
}

async function main() {
    await createBucket();

    const macFile = 'InterviewTester-0.0.0-arm64.dmg';
    const winFile = 'InterviewTester Setup 0.0.0.exe';

    const macUrl = await uploadFile(macFile, 'application/x-apple-diskimage');
    const winUrl = await uploadFile(winFile, 'application/vnd.microsoft.portable-executable');

    if (macUrl || winUrl) {
        console.log('\n----------------------------------------');
        console.log('Update your .env file with these URLs:');
        if (macUrl) console.log(`VITE_DOWNLOAD_URL_MACOS=${macUrl}`);
        if (winUrl) console.log(`VITE_DOWNLOAD_URL_WINDOWS=${winUrl}`);
        console.log('----------------------------------------');
    }
}

main();
