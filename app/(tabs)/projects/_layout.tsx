import { router } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Appbar, Menu, Tooltip, useTheme } from 'react-native-paper'

import Locales from '@/lib/locales'
import { DrawerContent, DrawerHeader } from '@/lib/ui'


const DrawerLayout = () => {
    const theme = useTheme()
    const [visible, setVisible] = React.useState(false)

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => (
                    <DrawerContent navProps={props} showDivider={false} children={undefined} />
                )}
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: theme.colors.background,
                        paddingTop: 32
                    },
                    header: (props) => (
                        <DrawerHeader navProps={props} children={undefined} />
                    )
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: "Sawlist",
                        title: "Sawlist",
                        headerRight: () => (
                            <Tooltip title={Locales.t('search')}>
                                <Appbar.Action icon="magnify" onPress={() => router.push('/search')} />
                            </Tooltip>
                        )
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
