import { getHeaderTitle } from '@react-navigation/elements'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { router } from 'expo-router'
import React from 'react'
import { Appbar, AppbarProps, Searchbar } from 'react-native-paper'

interface StackHeaderProps extends AppbarProps {
  navProps: NativeStackHeaderProps
  withSearchbar?: boolean
}

const StackHeader = (props: StackHeaderProps) => (
  <Appbar.Header {...props}>
    {props.withSearchbar ? (
      <Searchbar
        value=""
        icon="arrow-left"
        onPress={() => router.push('/search')}
        placeholder={
          'Search ' +
          getHeaderTitle(props.navProps.options, props.navProps.route.name)
        }
        style={{ margin: 8, marginBottom: 16 }}
        onIconPress={() => props.navProps.navigation.goBack()}
      />
    ) : (
      <>
        {props.navProps.options.headerLeft
          ? props.navProps.options.headerLeft({
              canGoBack: props.navProps.navigation.canGoBack(),
            })
          : undefined}

        {props.navProps.back ? (
          <Appbar.BackAction onPress={props.navProps.navigation.goBack} />
        ) : null}

        <Appbar.Content
          title={getHeaderTitle(
            props.navProps.options,
            props.navProps.route.name,
          )}
        />

        {props.navProps.options.headerRight
          ? props.navProps.options.headerRight({
              canGoBack: props.navProps.navigation.canGoBack(),
            })
          : undefined}
      </>
    )}
  </Appbar.Header>
)

export default StackHeader
