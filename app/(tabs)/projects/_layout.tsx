import React from 'react'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Appbar, Tooltip, useTheme } from 'react-native-paper'
import { DrawerContent, DrawerHeader } from '@/lib/ui'
import useFramerStore from '@/lib/utils/store'

const DrawerLayout = () => {

    const theme = useTheme()
    const { activeProject, projectsSBVisibleChange } = useFramerStore()

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
                        drawerLabel: "Projects",
                        title: "Projects",
                        headerRight: () => (
                            <>
                                <Tooltip title="Search project">
                                    <Appbar.Action icon="magnify" onPress={() => projectsSBVisibleChange()} />
                                </Tooltip>
                            </>
                        )
                    }}
                />
                <Drawer.Screen
                    name="sawing-list"
                    options={{
                        drawerLabel: "Sawing list",
                        title: activeProject.name
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
