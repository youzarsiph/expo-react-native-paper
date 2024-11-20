import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { getHeaderTitle } from '@react-navigation/elements'
import React from 'react'
import { Appbar, AppbarProps } from 'react-native-paper'

interface TabsHeaderProps extends AppbarProps {
  navProps: BottomTabHeaderProps
}

const TabsHeader = (props: TabsHeaderProps) => (
  <Appbar.Header {...props}>
    {props.navProps.options.headerLeft
      ? props.navProps.options.headerLeft({})
      : undefined}

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

export default TabsHeader
