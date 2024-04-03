import React from "react";
import { Appbar, AppbarProps } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

interface HeaderProps extends AppbarProps {
  navProps: NativeStackHeaderProps;
}

const Header = (props: HeaderProps) => (
  <Appbar.Header {...props}>
    {props.navProps.back ? (
      <Appbar.BackAction onPress={props.navProps.navigation.goBack} />
    ) : null}

    <Appbar.Content
      title={getHeaderTitle(props.navProps.options, props.navProps.route.name)}
    />
  </Appbar.Header>
);

export default Header;
