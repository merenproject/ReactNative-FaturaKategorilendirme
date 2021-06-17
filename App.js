import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { CameraScreen } from "./src/features/Camera/camera";
import { NavigationMain } from "./src/navigation/navigation.main";

export default function App() {
  return (
    <>
      <NavigationMain />

      <ExpoStatusBar style="auto" />
    </>
  );
}
