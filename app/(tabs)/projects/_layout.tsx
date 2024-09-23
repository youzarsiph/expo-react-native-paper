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
                        drawerLabel: "Packing list",
                        title: "Packing list",
                        headerRight: () => (
                            <>
                                <Tooltip title="Open project">
                                    <Appbar.Action icon="cloud-search-outline" onPress={() => router.push('/select-project')} />
                                </Tooltip>
                            </>
                        )
                    }}
                />
                <Drawer.Screen
                    name="wall-production"
                    options={{
                        drawerLabel: "Wall production",
                        title: "Wall production"
                    }}
                />
                <Drawer.Screen
                    name="beam-gluing"
                    options={{
                        drawerLabel: "Beam gluing",
                        title: "Beam gluing"
                    }}
                />
                <Drawer.Screen
                    name="product-loading"
                    options={{
                        drawerLabel: "Product loading",
                        title: "Product loading"
                    }}
                />
                <Drawer.Screen
                    name="equipment-maintenance"
                    options={{
                        drawerLabel: "Equipment maintenance",
                        title: "Equipment maintenance"
                    }}
                />
                <Drawer.Screen
                    name="your-activity"
                    options={{
                        drawerLabel: "Your activity",
                        title: "Your activity"
                    }}
                />
                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: "Settings",
                        title: "Settings"
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default DrawerLayout
