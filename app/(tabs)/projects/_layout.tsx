import { router } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Appbar, Menu, Tooltip, useTheme } from 'react-native-paper'
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
                        drawerLabel: "Current project",
                        title: "Current project",
                        headerRight: () => (
                            <>
                                <Tooltip title="Search">
                                    <Appbar.Action icon="magnify" onPress={() => router.push('/search')} />
                                </Tooltip>
                                <Tooltip title="Open project">
                                    <Appbar.Action icon="home-switch-outline" onPress={() => console.log('click')} />
                                </Tooltip>
                            </>
                        )
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default DrawerLayout
