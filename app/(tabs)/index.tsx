import React from 'react'
import { Chip, Divider, Surface, Text } from 'react-native-paper'

import Locales from '@/locales'

const TabsHome = () => (
  <Surface
    style={{
      flex: 1,
      gap: 16,
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text variant="displaySmall">{Locales.t('titleHome')}</Text>

    <Divider />

    <Text variant="bodyLarge">{Locales.t('openScreenCode')}</Text>

    <Chip textStyle={{ fontFamily: 'JetBrainsMono_400Regular' }}>
      app/(tabs)/index.tsx
    </Chip>

    <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
      {Locales.t('changeScreenCode')}
    </Text>
  </Surface>
)

export default TabsHome
