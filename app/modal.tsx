import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform } from "react-native";
import { Chip, Divider, Surface, Text } from "react-native-paper";

const Modal = () => (
  <Surface
    style={{
      flex: 1,
      gap: 16,
      padding: 32,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text variant="displaySmall">Modal</Text>

    <Divider />

    <Text variant="bodyLarge">Open up the code for this screen:</Text>

    <Chip textStyle={{ fontFamily: "JetBrainsMono" }}>app/modal.tsx</Chip>

    <Text variant="bodyLarge" style={{ textAlign: "center" }}>
      Change any of the text, save the file, and your app will automatically
      update.
    </Text>

    {/* Use a light status bar on iOS to account for the black space above the modal */}
    <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
  </Surface>
);

export default Modal;
