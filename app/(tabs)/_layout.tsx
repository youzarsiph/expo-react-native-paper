import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Appbar, Tooltip } from 'react-native-paper'
import { Tabs, router } from 'expo-router'
import { TabBar, TabsHeader } from '@/lib/ui'

const TabLayout = () => {

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => <TabsHeader navProps={props} children={undefined} />
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
              <Tooltip title="Log in">
                <Appbar.Action icon="account" onPress={() => router.push('/(auth)/login')} />
              </Tooltip>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons {...props} size={24} name={props.focused ? 'home-variant' : 'home-variant-outline'} />
          )
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
          headerRight: () => (
              <Tooltip title="Scanner history">
                <Appbar.Action icon="history" onPress={() => console.log('click')} />
              </Tooltip>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons {...props} size={24} name={props.focused ? 'data-matrix-scan' : 'data-matrix'} />
          )
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialCommunityIcons {...props} size={24} name={props.focused ? 'folder-multiple' : 'folder-multiple-outline'} />
          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout