import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';

const versionType = process.argv[2];
const currentVersion = process.env['npm_package_version']!;

const package_files = ['./package.json', './packages/starlight-theme-obsidian/package.json', './docs/package.json'];

const match = currentVersion.match(/(\d+)\.(\d+)\.(\d+)(-beta.(\d+))?/);
if (!match) {
	throw new Error(`Invalid version format: ${currentVersion}`);
}

const major = Number(match[1]);
const minor = Number(match[2]);
const patch = Number(match[3]);
const beta = match[5] ? Number(match[5]) : 0;

let newVersion = '';
switch (versionType) {
	case 'beta':
		newVersion = `${major}.${minor}.${beta ? patch : patch + 1}-beta.${beta + 1}`;
		break;
	case 'patch':
		newVersion = `${major}.${minor}.${patch + 1}`;
		break;
	case 'minor':
		newVersion = `${major}.${minor + 1}.0`;
		break;
	case 'major':
		newVersion = `${major + 1}.0.0`;
		break;
	default:
		throw new Error('Invalid version type');
}

for (const file of package_files) {
	const content = readFileSync(file, 'utf-8');
	const json = JSON.parse(content);

	json.version = newVersion;
	writeFileSync(file, JSON.stringify(json, null, '\t').replace(/\n/g, '\r\n'));
	console.log(`Updated ${file} to version ${newVersion}`);

	try {
		spawnSync('git', ['add', file]);
	} catch (error) {
		console.error('Error running git commands:', error);
		process.exit(1);
	}
}

try {
	spawnSync('git', ['commit', '-m', `chore(release): ${newVersion}`]);
	spawnSync('git', ['tag', '-a', newVersion, '-m', `chore(release): ${newVersion}`]);
	console.log(`Package has been successfully bumped | ${currentVersion} -> ${newVersion} [${versionType}]`);
} catch (error) {
	console.error('Error running git commands:', error);
	process.exit(1);
}

process.exit(0);
