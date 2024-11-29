import { router } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Appbar, Menu, Tooltip, useTheme } from 'react-native-paper'

import { DrawerContent, DrawerHeader, Locales } from '@/lib'

const DrawerLayout = () => {
  const theme = useTheme()
  const [visible, setVisible] = React.useState(false)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <DrawerContent
            navProps={props}
            showDivider={false}
            children={undefined}
            title="Drawer Navigation"
          />
        )}
        screenOptions={{
          drawerStyle: {
            backgroundColor: theme.colors.background,
            paddingTop: 32,
          },
          header: (props) => (
            <DrawerHeader navProps={props} children={undefined} />
          ),
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: Locales.t('titleHome'),
            title: Locales.t('titleHome'),
            headerRight: () => (
              <>
                <Tooltip title={Locales.t('search')}>
                  <Appbar.Action
                    icon="magnify"
                    onPress={() => router.push('/search')}
                  />
                </Tooltip>
                <Menu
                  statusBarHeight={48}
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                  anchor={
                    <Tooltip title={Locales.t('options')}>
                      <Appbar.Action
                        icon="dots-vertical"
                        onPress={() => setVisible(true)}
                      />
                    </Tooltip>
                  }
                >
                  <Menu.Item
                    title={Locales.t('titleSettings')}
                    leadingIcon="cog"
                    onPress={() => router.push('/drawer/settings')}
                  />
                  <Menu.Item
                    title={Locales.t('stackNav')}
                    leadingIcon="card-multiple-outline"
                    onPress={() => router.push('/modal')}
                  />
                  <Menu.Item
                    title={Locales.t('drawerNav')}
                    leadingIcon="gesture-swipe"
                    onPress={() => router.push('/drawer')}
                  />
                </Menu>
              </>
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: Locales.t('profile'),
            title: Locales.t('profile'),
            headerRight: () => (
              <>
                <Tooltip title={Locales.t('search')}>
                  <Appbar.Action
                    icon="magnify"
                    onPress={() => router.push('/search')}
                  />
                </Tooltip>
                <Tooltip title={Locales.t('titleSettings')}>
                  <Appbar.Action
                    icon="cog"
                    onPress={() => router.push('/(tabs)/settings')}
                  />
                </Tooltip>
              </>
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: Locales.t('titleSettings'),
            title: Locales.t('titleSettings'),
            headerRight: () => (
              <Tooltip title={Locales.t('stackNav')}>
                <Appbar.Action
                  icon="card-multiple-outline"
                  onPress={() => router.push('/modal')}
                />
              </Tooltip>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default DrawerLayout
