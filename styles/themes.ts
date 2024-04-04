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

import Colors from "@/styles/colors";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const Themes = {
  light: {
    default: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.default,
      },
    },
    yellow: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.yellow,
      },
    },
    orange: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.orange,
      },
    },
    red: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.red,
      },
    },
    violet: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.violet,
      },
    },
    indigo: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.indigo,
      },
    },
    blue: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.blue,
      },
    },
    teal: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.teal,
      },
    },
    cyan: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.cyan,
      },
    },
    green: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.green,
      },
    },
    lime: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.lime,
      },
    },
    olive: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.olive,
      },
    },
    brown: {
      ...LightTheme,
      ...MD3LightTheme,
      colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        ...Colors.light.brown,
      },
    },
  },
  dark: {
    default: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.default,
      },
    },
    yellow: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.yellow,
      },
    },
    red: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.red,
      },
    },
    orange: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.orange,
      },
    },
    violet: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.violet,
      },
    },
    indigo: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.indigo,
      },
    },
    blue: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.blue,
      },
    },
    teal: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.teal,
      },
    },
    cyan: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.cyan,
      },
    },
    green: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.green,
      },
    },
    lime: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.lime,
      },
    },
    olive: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.olive,
      },
    },
    brown: {
      ...DarkTheme,
      ...MD3DarkTheme,
      colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        ...Colors.dark.brown,
      },
    },
  },
};

export default Themes;
