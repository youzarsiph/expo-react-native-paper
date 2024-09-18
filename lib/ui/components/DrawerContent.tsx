import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { router } from 'expo-router'
import React from 'react'
import { Drawer, DrawerSectionProps, Badge } from 'react-native-paper'

interface DrawerContentProps extends DrawerSectionProps {
  navProps: DrawerContentComponentProps
}

const DrawerContent = (props: DrawerContentProps) => (
  <>
    <Drawer.Section {...props}>
      <Drawer.Item
        label="Current project"
        icon="calendar"
        active={props.navProps.state.index === 0}
        onPress={() => console.log("click")}
      />
    </Drawer.Section>
    <Drawer.Section title="Last 5 projects" {...props}>
      <Drawer.Item
        label="Michael Levy"
        icon="progress-clock"
        active={props.navProps.state.index === 1}
        onPress={() => console.log("click")}
      />
      <Drawer.Item
        label="James Small"
        icon="progress-check"
        active={props.navProps.state.index === 2}
        onPress={() => console.log("click")}
      />
      <Drawer.Item
        label="Villa San Giovanni"
        icon="check-circle"
        active={props.navProps.state.index === 3}
        onPress={() => console.log("click")}
      />
      <Drawer.Item
        label="Roel van Leeuwen"
        icon="circle"
        active={props.navProps.state.index === 4}
        onPress={() => console.log("click")}
      />
      <Drawer.Item
        label="Mario Bertolla"
        icon="circle"
        active={props.navProps.state.index === 5}
        onPress={() => console.log("click")}
      />
    </Drawer.Section>
  </>
)

export default DrawerContent
