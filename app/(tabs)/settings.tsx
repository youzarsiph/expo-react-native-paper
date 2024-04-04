import React from "react";
import * as SecureStore from "expo-secure-store";
import { Platform, useColorScheme } from "react-native";
import {
  Surface,
  List,
  Menu,
  Button,
  IconButton,
  Text,
  Divider,
  Chip,
  Snackbar,
} from "react-native-paper";
import { Colors } from "@/styles";
import { Color, Setting } from "@/types";
import { LoadingIndicator } from "@/components";

const Settings = () => {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [display, setDisplay] = React.useState({ theme: false, color: false });
  const [message, setMessage] = React.useState({ visible: false, content: "" });
  const [settings, setSettings] = React.useState<Setting>({
    theme: "auto",
    color: "default",
  });

  React.useEffect(() => {
    setLoading(true);

    if (Platform.OS !== "web") {
      SecureStore.getItemAsync("settings")
        .then((result) =>
          setSettings(JSON.parse(result ?? JSON.stringify(settings))),
        )
        .catch((res) =>
          setMessage({
            visible: true,
            content: res.message,
          }),
        );
    }

    setLoading(false);
  }, []);

  return (
    <Surface style={{ flex: 1 }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Surface elevation={0}>
          <List.AccordionGroup>
            <List.Accordion
              id="1"
              title="Appearance"
              left={(props) => <List.Icon {...props} icon={"palette"} />}
            >
              <List.Item
                title="Mode"
                description="Switch between light and dark mode"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={
                      settings.theme === "auto"
                        ? "theme-light-dark"
                        : settings.theme === "light"
                          ? "weather-sunny"
                          : "weather-night"
                    }
                  />
                )}
                right={(props) => (
                  <Menu
                    visible={display.theme}
                    onDismiss={() => setDisplay({ ...display, theme: false })}
                    anchor={
                      <IconButton
                        {...props}
                        icon={"pencil"}
                        onPress={() => setDisplay({ ...display, theme: true })}
                      />
                    }
                  >
                    <Menu.Item
                      title="Auto"
                      leadingIcon={"theme-light-dark"}
                      trailingIcon={
                        settings.theme === "auto" ? "check" : undefined
                      }
                      onPress={() => {
                        setSettings({ ...settings, theme: "auto" });
                        setDisplay({ ...display, theme: false });
                      }}
                    />
                    <Menu.Item
                      title="Light"
                      leadingIcon={"weather-sunny"}
                      trailingIcon={
                        settings.theme === "light" ? "check" : undefined
                      }
                      onPress={() => {
                        setSettings({ ...settings, theme: "light" });
                        setDisplay({ ...display, theme: false });
                      }}
                    />
                    <Menu.Item
                      title="Dark"
                      leadingIcon={"weather-night"}
                      trailingIcon={
                        settings.theme === "dark" ? "check" : undefined
                      }
                      onPress={() => {
                        setSettings({ ...settings, theme: "dark" });
                        setDisplay({ ...display, theme: false });
                      }}
                    />
                  </Menu>
                )}
              />
              <List.Item
                title="Color"
                description="Change theme color"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={"palette-swatch-variant"}
                    color={
                      Colors[
                        settings.theme === "auto"
                          ? colorScheme ?? "light"
                          : settings.theme
                      ][settings.color]["primary"]
                    }
                  />
                )}
                right={(props) => (
                  <Menu
                    visible={display.color}
                    onDismiss={() => setDisplay({ ...display, color: false })}
                    anchor={
                      <IconButton
                        {...props}
                        icon={"pencil"}
                        onPress={() => setDisplay({ ...display, color: true })}
                      />
                    }
                  >
                    {Object.keys(Colors.light).map((color) => (
                      <Menu.Item
                        key={color}
                        title={color}
                        trailingIcon={
                          color === settings.color ? "check" : undefined
                        }
                        onPress={() => {
                          setSettings({ ...settings, color: color as Color });
                          setDisplay({ ...display, color: false });
                        }}
                      />
                    ))}
                  </Menu>
                )}
              />
            </List.Accordion>
          </List.AccordionGroup>
        </Surface>
      )}

      <Surface
        elevation={0}
        style={{
          flex: 1,
          gap: 16,
          padding: 32,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text variant="displaySmall">Settings</Text>

        <Divider />

        <Text variant="bodyLarge">Open up the code for this screen:</Text>

        <Chip textStyle={{ fontFamily: "JetBrainsMono" }}>
          app/(tabs)/settings.tsx
        </Chip>

        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </Surface>

      <Button
        mode="contained"
        style={{ margin: 16 }}
        onPress={() =>
          SecureStore.setItemAsync("settings", JSON.stringify(settings))
            .then(() =>
              setMessage({
                visible: true,
                content: "Restart the app to apply changes",
              }),
            )
            .catch((res) =>
              setMessage({
                visible: true,
                content: res.message,
              }),
            )
        }
      >
        Save
      </Button>

      <Snackbar
        visible={message.visible}
        onDismiss={() => setMessage({ ...message, visible: false })}
        onIconPress={() => setMessage({ ...message, visible: false })}
      >
        {message.content}
      </Snackbar>
    </Surface>
  );
};

export default Settings;
