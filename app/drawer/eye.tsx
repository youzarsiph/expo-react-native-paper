import React from 'react'
import { Surface } from 'react-native-paper'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const Eye = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t('eye')} path="app/drawer/eye.tsx" />
  </Surface>
)

export default Eye
