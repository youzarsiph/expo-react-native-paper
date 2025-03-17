import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { getHeaderTitle } from '@react-navigation/elements'
import React from 'react'
import {
  Appbar,
  AppbarProps,
  Searchbar,
  SearchbarProps,
} from 'react-native-paper'

interface TabsHeaderProps extends AppbarProps {
  navProps: BottomTabHeaderProps
  withSearchBar?: boolean
  searchBarProps?: SearchbarProps
}

const TabsHeader = (props: TabsHeaderProps) => {
  const [query, setQuery] = React.useState('')

  React.useEffect(() => {
    if (props.searchBarProps?.onChangeText) {
      props.searchBarProps.onChangeText(query)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return props.withSearchBar ? (
    <Appbar.Header {...props}>
      <Searchbar
        {...props.searchBarProps}
        value={query}
        onChangeText={setQuery}
        style={{ margin: 8, marginBottom: 16 }}
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
