const fs = require("fs");
const path = require("path");

const version = process.argv[2];
const bundlePath = process.argv[3];

const manifestPath = path.join(__dirname, "manifest.json");
const configPath = path.join(__dirname, "ota-config.json");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const CDN_BASE = config.cdnBaseUrl;

const newManifest = {
    ...manifest,
    version,
    bundleUrl: `${CDN_BASE}/${version}/index.android.bundle`,
    lastUpdated: new Date().toISOString()
};

fs.writeFileSync(manifestPath, JSON.stringify(newManifest, null, 2));
console.log("✔ Manifest updated:", newManifest);
