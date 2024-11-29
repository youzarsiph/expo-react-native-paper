import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { getHeaderTitle } from '@react-navigation/elements'
import React from 'react'
import {
  Appbar,
  AppbarProps,
  IconButton,
  Searchbar,
  SearchbarProps,
  Tooltip,
} from 'react-native-paper'

interface TabsHeaderProps extends AppbarProps {
  navProps: BottomTabHeaderProps
  withSearchBar?: boolean
  searchBarProps?: SearchbarProps
}

const TabsHeader = (props: TabsHeaderProps) => {
  const [query, setQuery] = React.useState('')

  return props.withSearchBar ? (
    <Appbar.Header {...props}>
      <Searchbar
        {...props.searchBarProps}
        value={query}
        onChangeText={setQuery}
        style={{ margin: 8, marginBottom: 16 }}
        right={(p) => (
          <Tooltip title="Perform search">
            <IconButton
              {...p}
              icon="check"
              onPress={() =>
                props.searchBarProps?.onChangeText
                  ? props.searchBarProps.onChangeText(query)
                  : undefined
              }
            />
          </Tooltip>
        )}
      />
    </Appbar.Header>
  ) : (
    <Appbar.Header {...props}>
      {props.navProps.options.headerLeft
        ? props.navProps.options.headerLeft({})
        : undefined}

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

export default TabsHeader
