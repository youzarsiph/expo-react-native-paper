import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Drawer, DrawerSectionProps, Surface, Avatar, Badge } from 'react-native-paper'

interface DrawerContentProps extends DrawerSectionProps {
  navProps: DrawerContentComponentProps
}

const DrawerContent = (props: DrawerContentProps) => {

  const currentIndex = (v: number) => {
    //console.log(props.navProps.state.index)
    if (props.navProps.state.index === v) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <Surface elevation={0} style={styles.surface}>
        <Avatar.Image size={72} source={require('../../../assets/images/avatar.jpg')} />
        <Text variant="titleMedium">Vjaceslavs Stefanovics</Text>
      </Surface>
      <Drawer.Section {...props} style={{ marginTop: 32 }}>
        <Drawer.Item
          label="Projects"
          icon={currentIndex(0) ? 'card-account-details' : 'card-account-details-outline'}
          active={currentIndex(0)}
          onPress={() => router.push('/(tabs)/projects')}
        />
        <Drawer.Item
          label="Sawing list"
          icon={currentIndex(1) ? 'ballot' : 'ballot-outline'}
          active={currentIndex(1)}
          onPress={() => router.push('/(tabs)/projects/sawing-list')}
        />
        <Drawer.Item
          label="Wall production"
          icon={currentIndex(2) ? 'view-quilt' : 'view-quilt-outline'}
          active={currentIndex(2)}
          onPress={() => router.push('/(tabs)/projects/wall-production')}
        />
        <Drawer.Item
          label="Beam gluing"
          icon={currentIndex(3) ? 'view-day' : 'view-day-outline'}
          active={currentIndex(3)}
          onPress={() => router.push('/(tabs)/projects/beam-gluing')}
        />
        <Drawer.Item
          label="Product loading"
          icon={currentIndex(4) ? 'truck' : 'truck-outline'}
          active={currentIndex(4)}
          onPress={() => router.push('/(tabs)/projects/product-loading')}
        />
        <Drawer.Item
          label="Equipment maintenance"
          icon={currentIndex(5) ? 'wrench' : 'wrench-outline'}
          active={currentIndex(5)}
          onPress={() => router.push('/(tabs)/projects/equipment-maintenance')}
        />
        <Drawer.Item
          label="Your activity"
          icon={currentIndex(6) ? 'chart-box' : 'chart-box-outline'}
          active={currentIndex(6)}
          onPress={() => router.push('/(tabs)/projects/your-activity')}
        />
        <Drawer.Item
          label="Settings"
          icon={currentIndex(7) ? 'cog' : 'cog-outline'}
          active={currentIndex(7)}
          onPress={() => router.push('/(tabs)/projects/settings')}
        />
      </Drawer.Section>
    </>
  )
}

export default DrawerContent

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
})