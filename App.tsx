import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import { checkForOtaUpdate, downloadBundle } from './Src/OtaManager';
import RNRestart from 'react-native-restart';

const CURRENT_JS_VERSION = "ota-1.0.0";
// Change this version whenever you release a new native build

export default function App() {
  const [loading, setLoading] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState<any>(null);

  useEffect(() => {
    async function initOTA() {
      console.log("🔍 Checking for OTA update...");

      const update = await checkForOtaUpdate(CURRENT_JS_VERSION);
      if (update) {
        console.log("📦 OTA Update available:", update.version);
        setUpdateAvailable(update);

        Alert.alert(
            "Update Available",
            "A new update is available. Download now?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Download", onPress: () => handleDownload(update) }
            ]
        );
      } else {
        console.log("✔ No OTA update found");
      }
    }

    initOTA();
  }, []);

  async function handleDownload(update: any) {
    setLoading(true);

    const savedPath = await downloadBundle(update);

    setLoading(false);

    if (savedPath) {
      Alert.alert(
          "Update Ready",
          "Restart app to apply update.",
          [
            { text: "Restart Now", onPress: () => RNRestart.Restart() },
            { text: "Later", style: "cancel" }
          ]
      );
    } else {
      Alert.alert("Error", "Failed to download update.");
    }
  }

  return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text style={{ fontSize: 20 }}>React Native OTA Demo</Text>

        {loading && (
            <>
              <ActivityIndicator size="large" color="blue" />
              <Text>Downloading update...</Text>
            </>
        )}

        {updateAvailable && !loading && (
            <Button
                title="Download Update"
                onPress={() => handleDownload(updateAvailable)}
            />
        )}
      </View>
  );
}
