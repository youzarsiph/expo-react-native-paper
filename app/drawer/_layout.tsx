import { router } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Appbar, Tooltip, useTheme } from 'react-native-paper'

import { DrawerContent, DrawerHeader } from '@/components'
import Locales from '@/locales'

const DrawerLayout = () => {
  const theme = useTheme()

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
