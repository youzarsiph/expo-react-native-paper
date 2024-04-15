import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import React from "react";
import { Appbar, Tooltip } from "react-native-paper";

import { TabBar, TabsHeader } from "@/components";
import Locales from "@/locales";

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
        title: Locales.t("titleHome"),
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
        title: Locales.t("titleSettings"),
        headerRight: () => (
          <>
            <Tooltip title={Locales.t("stackNav")}>
              <Appbar.Action
                icon="card-multiple-outline"
                onPress={() => router.push("/modal")}
              />
            </Tooltip>
            <Tooltip title={Locales.t("drawerNav")}>
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
