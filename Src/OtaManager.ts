import RNFS from 'react-native-fs';

const OTA_DIR = `./ota/manifest.json`;
const MANIFEST_URL = "https://github.com/Kavahardik/CodeMagic_OTA_Demo/releases/download/ota-1.0.1/manifest.json";

export async function checkForOtaUpdate(currentVersion: string) {
    try {
        const response = await fetch(MANIFEST_URL);
        const manifest = await response.json();

        if (manifest.version !== currentVersion) {
            console.log("OTA: New version found", manifest.version);
            return manifest;
        }

        return null;
    } catch (e) {
        console.log("OTA: check failed", e);
        return null;
    }
}

export async function downloadBundle(manifest: any) {
    try {
        await RNFS.mkdir(OTA_DIR);
        const localBundle = `${OTA_DIR}/index.android.bundle`;

        await RNFS.downloadFile({
            fromUrl: manifest.bundleUrl,
            toFile: localBundle,
        }).promise;

        console.log("OTA: Download complete");
        return localBundle;
    } catch (e) {
        console.log("OTA download error", e);
        return null;
    }
}
