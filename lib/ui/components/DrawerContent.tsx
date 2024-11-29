import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { router } from 'expo-router'
import React from 'react'
import { Drawer, DrawerSectionProps } from 'react-native-paper'

import { Locales } from '@/lib/locales'

interface DrawerContentProps extends DrawerSectionProps {
  navProps: DrawerContentComponentProps
}

const DrawerContent = (props: DrawerContentProps) => (
  <Drawer.Section {...props}>
    <Drawer.Item
      label={Locales.t('goHome')}
      icon="arrow-left"
      onPress={() => router.replace('/')}
    />
    <Drawer.Item
      label={Locales.t('titleHome')}
      icon="home"
      active={props.navProps.state.index === 0}
      onPress={() => router.push('/drawer')}
    />
    <Drawer.Item
      label={Locales.t('profile')}
      icon="account"
      active={props.navProps.state.index === 1}
      onPress={() => router.push('/drawer/profile')}
    />
    <Drawer.Item
      label={Locales.t('titleSettings')}
      icon="cog"
      active={props.navProps.state.index === 2}
      onPress={() => router.push('/drawer/settings')}
    />
  </Drawer.Section>
)

export default DrawerContent
