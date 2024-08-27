import React from 'react'
import { Surface } from 'react-native-paper'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const TabsHome = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t('titleHome')} path="app/(tabs)/index.tsx" />
  </Surface>
)

export default TabsHome
