import React from 'react'
import { Surface } from 'react-native-paper'

import { Locales, ScreenInfo, styles } from '@/lib'

const TabsHome = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t('titleHome')} path="app/(tabs)/index.tsx" />
  </Surface>
)

export default TabsHome
