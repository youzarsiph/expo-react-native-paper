import { Link, Stack } from 'expo-router'
import React from 'react'
import { Surface, Text } from 'react-native-paper'

import Locales from '@/locales'

const NotFound = () => (
  <Surface
    style={{
      flex: 1,
      gap: 16,
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Stack.Screen options={{ title: Locales.t('titleNotFound') }} />

    <Text variant="displayLarge">{Locales.t('titleNotFound')}</Text>

    <Text variant="bodyLarge">{Locales.t('screen404')}</Text>

    <Link href="/">
      <Text variant="bodyLarge">{Locales.t('goHome')}</Text>
    </Link>
  </Surface>
)

export default NotFound
