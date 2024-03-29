import React from "react";
import { Link, Stack } from "expo-router";
import { Divider, Surface, Text } from "react-native-paper";

const NotFound = () => (
  <Surface
    style={{
      flex: 1,
      gap: 16,
      padding: 32,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Stack.Screen options={{ title: "Oops!" }} />

    <Text variant="displayLarge">Not Found</Text>

    <Divider />

    <Text variant="bodyLarge">This screen doesn't exist.</Text>

    <Link href="/">
      <Text variant="bodyLarge">Go to home screen!</Text>
    </Link>
  </Surface>
);

export default NotFound;
