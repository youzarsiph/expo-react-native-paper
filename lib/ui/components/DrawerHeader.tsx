import { DrawerHeaderProps as BaseProps } from '@react-navigation/drawer'
import { getHeaderTitle } from '@react-navigation/elements'
import React from 'react'
import { Appbar, AppbarProps } from 'react-native-paper'

interface DrawerHeaderProps extends AppbarProps {
  navProps: BaseProps
}

const DrawerHeader = (props: DrawerHeaderProps) => (
  <Appbar.Header {...props}>
    <Appbar.Action
      icon="menu"
      onPress={() => props.navProps.navigation.openDrawer()}
    />

    <Appbar.Content
      title={getHeaderTitle(props.navProps.options, props.navProps.route.name)}
    />

    {props.navProps.options.headerRight
      ? props.navProps.options.headerRight({
          canGoBack: props.navProps.navigation.canGoBack(),
        })
      : undefined}
  </Appbar.Header>
)

export default DrawerHeader
