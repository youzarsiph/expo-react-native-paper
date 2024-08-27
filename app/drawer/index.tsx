import React from 'react'
import { Surface } from 'react-native-paper'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const DrawerHome = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t('titleHome')} path="app/drawer/index.tsx" />
  </Surface>
)

export default DrawerHome
