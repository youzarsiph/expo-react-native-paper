import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import React from "react";
import { Appbar, Tooltip } from "react-native-paper";

import { TabBar, TabsHeader } from "@/components";

const TabLayout = () => (
  <Tabs
    tabBar={(props) => <TabBar {...props} />}
    screenOptions={{
      tabBarHideOnKeyboard: true,
      header: (props) => <TabsHeader navProps={props} children={undefined} />,
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
          <>
            <Tooltip title="Stack Navigation">
              <Appbar.Action
                icon="card-multiple-outline"
                onPress={() => router.push("/modal")}
              />
            </Tooltip>
            <Tooltip title="Drawer Navigation">
              <Appbar.Action
                icon="gesture-swipe"
                onPress={() => router.push("/drawer/")}
              />
            </Tooltip>
          </>
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
