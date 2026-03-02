const [major] = process.versions.node.split('.').map(Number);

if (major < 20 || major >= 23) {
  console.error(`\nUnsupported Node.js version: ${process.versions.node}`);
  console.error('This project requires Node.js >=20 and <23 (use `nvm use`).\n');
  process.exit(1);
}
