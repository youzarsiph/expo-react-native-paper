import React from "react";
import { Chip, Divider, Surface, Text } from "react-native-paper";

const DrawerHome = () => (
  <Surface
    style={{
      flex: 1,
      gap: 16,
      padding: 32,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text variant="displaySmall">Drawer Home</Text>

    <Divider />

    <Text variant="bodyLarge">Open up the code for this screen:</Text>

    <Chip textStyle={{ fontFamily: "JetBrainsMono_400Regular" }}>
      app/drawer/index.tsx
    </Chip>

    <Text variant="bodyLarge" style={{ textAlign: "center" }}>
      Change any of the text, save the file, and your app will automatically
      update.
    </Text>
  </Surface>
);

export default DrawerHome;
