import { getHeaderTitle } from '@react-navigation/elements'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React from 'react'
import { Appbar, AppbarProps } from 'react-native-paper'

interface StackHeaderProps extends AppbarProps {
  navProps: NativeStackHeaderProps
}

const StackHeader = (props: StackHeaderProps) => {
  return (
    <Appbar.Header {...props} mode='center-aligned'>
      {props.navProps.options.headerLeft
        ? props.navProps.options.headerLeft({
          canGoBack: props.navProps.navigation.canGoBack(),
        })
        : undefined}

      {props.navProps.back ? (
        <Appbar.BackAction onPress={props.navProps.navigation.goBack} />
      ) : null}

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
}

export default StackHeader
