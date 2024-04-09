import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { Drawer, DrawerSectionProps } from "react-native-paper";

interface DrawerContentProps extends DrawerSectionProps {
  navProps: DrawerContentComponentProps;
}

const DrawerContent = (props: DrawerContentProps) => (
  <Drawer.Section {...props}>
    <Drawer.Item
      label="Go back"
      icon="arrow-left"
      onPress={() => router.replace("/")}
    />
    <Drawer.Item
      label="Home"
      icon="home"
      active={props.navProps.state.index === 0}
      onPress={() => router.push("/drawer/")}
    />
    <Drawer.Item
      label="Settings"
      icon="cog"
      active={props.navProps.state.index === 1}
      onPress={() => router.push("/drawer/settings")}
    />
  </Drawer.Section>
);

export default DrawerContent;
