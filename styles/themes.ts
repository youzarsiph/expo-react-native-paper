/**
 * Themes
 */

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
  MD3LightTheme,
  MD3DarkTheme,
} from "react-native-paper";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const Themes = {
  light: {
    ...LightTheme,
    ...MD3LightTheme,
    colors: {
      ...LightTheme.colors,
      ...MD3LightTheme.colors,
    },
  },
  dark: {
    ...DarkTheme,
    ...MD3DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...MD3DarkTheme.colors,
    },
  },
};

export default Themes;
