import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getHeaderTitle } from "@react-navigation/elements";
import { Tabs, router } from "expo-router";
import React from "react";
import { Appbar, IconButton, Tooltip } from "react-native-paper";

import { TabBar } from "@/components";

const TabLayout = () => (
  <Tabs
    tabBar={(props) => <TabBar {...props} />}
    screenOptions={{
      tabBarHideOnKeyboard: true,
      header: (props) => {
        const title = getHeaderTitle(props.options, props.route.name);

        return (
          <Appbar.Header style={{ gap: 16, paddingHorizontal: 16 }}>
            <Appbar.Content title={title} />

            {props.options.headerRight
              ? props.options.headerRight({})
              : undefined}
          </Appbar.Header>
        );
      },
    }}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: "Home",
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? "home" : "home-outline"}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: "Settings",
        headerRight: () => (
          <Tooltip title="Info">
            <IconButton
              icon="information"
              onPress={() => router.push("/modal")}
            />
          </Tooltip>
        ),
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? "cog" : "cog-outline"}
          />
        ),
      }}
    />
  </Tabs>
);

export default TabLayout;
