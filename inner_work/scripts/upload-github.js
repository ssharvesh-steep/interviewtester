import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually parse .env
const envPath = path.resolve(__dirname, '..', '.env');
const envVars = {};
try {
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
                envVars[key] = value;
            }
        });
    }
} catch (error) {
    console.warn(`Warning: Could not read .env file (${error.message}).`);
    console.warn('Proceeding with environment variables only.');
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || envVars.GITHUB_TOKEN;
// Get Owner and Repo from package.json or hardocded
// You can also parse it from .git config if needed, but for now let's try to extract from git remote
// or just ask the user. Since the previous tool call mentioned the repo is https://github.com/ssharvesh-steep/test-website
const REPO_OWNER = 'ssharvesh-steep';
const REPO_NAME = 'test-website';

if (!GITHUB_TOKEN) {
    console.error('Error: GITHUB_TOKEN is required in .env file.');
    process.exit(1);
}

const RELEASE_DIR = path.resolve(__dirname, '..', 'release');
const TAG_NAME = 'v1.0.0'; // You can make this dynamic based on package.json version

async function createOrGetRelease() {
    console.log(`Checking release ${TAG_NAME}...`);

    // Check if release exists
    let response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/tags/${TAG_NAME}`, {
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log(`Release ${TAG_NAME} found (ID: ${data.id}).`);
        return data;
    }

    if (response.status === 404) {
        console.log(`Release ${TAG_NAME} not found. Creating...`);
        response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tag_name: TAG_NAME,
                target_commitish: 'main',
                name: `Release ${TAG_NAME}`,
                body: 'Automated release upload',
                draft: false,
                prerelease: false
            })
        });

        if (!response.ok) {
            console.error('Failed to create release:', await response.text());
            process.exit(1);
        }

        const data = await response.json();
        console.log(`Release ${TAG_NAME} created (ID: ${data.id}).`);
        return data;
    }

    console.error('Error checking release:', await response.text());
    process.exit(1);
}

async function uploadAsset(releaseId, filePath, fileName) {
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return null;
    }

    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    const fileBuffer = fs.readFileSync(filePath);

    console.log(`Uploading ${fileName} (${(fileSize / 1024 / 1024).toFixed(2)} MB)...`);

    // We need to delete existing asset if it exists, otherwise GitHub errors
    // First, list assets
    const listResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/${releaseId}/assets`, {
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    if (listResponse.ok) {
        const assets = await listResponse.json();
        const existingAsset = assets.find(a => a.name === fileName);
        if (existingAsset) {
            console.log(`Asset ${fileName} exists. Deleting...`);
            await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/assets/${existingAsset.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
        }
    }

    // Upload
    const response = await fetch(`https://uploads.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/${releaseId}/assets?name=${fileName}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/octet-stream',
            'Content-Length': fileSize
        },
        body: fileBuffer
    });

    if (!response.ok) {
        console.error(`Failed to upload ${fileName}:`, await response.text());
        return null;
    }

    const data = await response.json();
    console.log(`Successfully uploaded ${fileName}`);
    // Use browser_download_url
    return data.browser_download_url;
}

async function main() {
    const release = await createOrGetRelease();

    // Find installer files dynamically - SCA failed with EPERM, using hardcoded known names
    // const files = fs.readdirSync(RELEASE_DIR);
    // const dmgFile = files.find(f => f.endsWith('.dmg') && !f.includes('blockmap'));
    // const exeFile = files.find(f => f.endsWith('.exe') && !f.includes('blockmap'));

    // Hardcoded names from previous list_dir
    const dmgFile = 'InterviewTester-0.0.0-arm64.dmg';
    const exeFile = 'InterviewTester Setup 0.0.0.exe';

    let macUrl = null;
    let winUrl = null;

    if (dmgFile && fs.existsSync(path.join(RELEASE_DIR, dmgFile))) {
        macUrl = await uploadAsset(release.id, path.join(RELEASE_DIR, dmgFile), dmgFile);
    } else {
        console.warn('No .dmg file found (or permission denied).');
    }

    if (exeFile && fs.existsSync(path.join(RELEASE_DIR, exeFile))) {
        winUrl = await uploadAsset(release.id, path.join(RELEASE_DIR, exeFile), exeFile);
    } else {
        console.warn('No .exe file found (or permission denied).');
    }

    if (macUrl || winUrl) {
        console.log('\n----------------------------------------');
        console.log('Update your .env file with these URLs:');
        if (macUrl) console.log(`VITE_DOWNLOAD_URL_MACOS=${macUrl}`);
        if (winUrl) console.log(`VITE_DOWNLOAD_URL_WINDOWS=${winUrl}`);
        console.log('----------------------------------------');
    }
}

main();
