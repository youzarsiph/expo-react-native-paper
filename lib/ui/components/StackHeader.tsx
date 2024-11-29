import { getHeaderTitle } from '@react-navigation/elements'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React from 'react'
import {
  Appbar,
  AppbarProps,
  IconButton,
  Searchbar,
  SearchbarProps,
} from 'react-native-paper'

interface StackHeaderProps extends AppbarProps {
  navProps: NativeStackHeaderProps
  withSearchbar?: boolean
  searchBarProps?: SearchbarProps
}

const StackHeader = (props: StackHeaderProps) => {
  const [query, setQuery] = React.useState('')

  return props.withSearchbar ? (
    <Appbar.Header {...props}>
      <Searchbar
        {...props.searchBarProps}
        icon="arrow-left"
        value={query}
        onChangeText={setQuery}
        style={{ margin: 8, marginBottom: 16 }}
        onIconPress={() => props.navProps.navigation.goBack()}
        right={(p) => (
          <IconButton
            {...p}
            icon="magnify"
            onPress={() =>
              props.searchBarProps?.onChangeText
                ? props.searchBarProps.onChangeText(query)
                : undefined
            }
          />
        )}
      />
    </Appbar.Header>
  ) : (
    <Appbar.Header {...props}>
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
    </Appbar.Header>
  )
}

export default StackHeader
